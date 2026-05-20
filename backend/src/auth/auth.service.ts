import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff, StaffRole } from '../staff/entities/staff.entity';
import { Hotel, HotelStatus } from '../hotel/entities/hotel.entity';
import { TourPartner, PartnerStatus as TourPartnerStatus } from '../packages/entities/tour-partner.entity';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { BusVendor } from '../buses/entities/bus-vendor.entity';
import { CabVendor } from '../cabs/entities/cab-vendor.entity';
import * as fs from 'fs';

@Injectable()
export class AuthService {
       constructor(
              @InjectRepository(Staff)
              private staffRepository: Repository<Staff>,
              @InjectRepository(Hotel)
              private hotelRepository: Repository<Hotel>,
              @InjectRepository(TourPartner)
              private tourPartnerRepository: Repository<TourPartner>,
              @InjectRepository(BusVendor)
              private busVendorRepository: Repository<BusVendor>,
              @InjectRepository(CabVendor)
              private cabVendorRepository: Repository<CabVendor>,
              private jwtService: JwtService,
       ) { }

       private logDebug(message: string) {
              const logEntry = `[${new Date().toISOString()}] (Service) ${message}\n`;
              try { fs.appendFileSync('signup_debug.log', logEntry); } catch (e) { }
       }

       async signup(signUpDto: SignUpDto) {
              const {
                     email, password, name, hotelName, contactNumber,
                     ownerFirstName, ownerLastName, ownerPhone,
                     businessName, businessType, city,
                     bankHolder, bankName, bankAccount, bankIfsc,
                     gstNumber, panNumber,
                     gstDoc, panDoc, licenseDoc,
                     partnerType, tourismLicenseNumber, registrationNumber,
                     website, yearsInOperation, operatingArea
              } = signUpDto;

              this.logDebug(`AuthService.signup for ${email} as ${partnerType}`);

              const existingStaff = await this.staffRepository.findOne({ where: { email } });
              if (existingStaff) {
                     throw new BadRequestException('Email already in use.');
              }

              // Hash password
              const saltOrRounds = 10;
              const passwordHash = await bcrypt.hash(password, saltOrRounds);

              let savedPartner: any;
              let partnerIdField: string = 'hotelId';

              if (partnerType === 'SITESEEING' || partnerType === 'PACKAGES') {
                     const tourPartner = this.tourPartnerRepository.create({
                            name: businessName || name,
                            businessName,
                            businessType: businessType || (partnerType === 'SITESEEING' ? 'Tour Operator' : 'Travel Agency'),
                            city,
                            email,
                            contactNumber,
                            gstNumber,
                            panNumber,
                            registrationNumber: registrationNumber || tourismLicenseNumber,
                            bankHolder,
                            bankName,
                            bankAccount,
                            bankIfsc,
                            gstDoc,
                            panDoc,
                            licenseDoc,
                            website,
                            yearsInOperation,
                            operatingArea
                     });
                     savedPartner = await this.tourPartnerRepository.save(tourPartner);
                     partnerIdField = 'tourPartnerId';
              } else if (partnerType === 'BUS') {
                     const busVendor = this.busVendorRepository.create({
                            name: businessName || name,
                            email,
                            contactNumber,
                            address: city,
                            gstNumber,
                            panNumber
                     });
                     savedPartner = await this.busVendorRepository.save(busVendor);
                     partnerIdField = 'busVendorId';
              } else if (partnerType === 'CAB') {
                     const cabVendor = this.cabVendorRepository.create({
                            name: businessName || name,
                            email,
                            phone: contactNumber,
                            address: city,
                            gstNumber,
                            panNumber
                     });
                     savedPartner = await this.cabVendorRepository.save(cabVendor);
                     partnerIdField = 'cabVendorId';
              } else {
                     // Default to HOTEL
                     const hotel = this.hotelRepository.create({
                            name: hotelName || businessName,
                            contactNumber,
                            email,
                            isVerified: false,
                            ownerFirstName,
                            ownerLastName,
                            ownerPhone,
                            businessName,
                            businessType,
                            city,
                            bankHolder,
                            bankName,
                            bankAccount,
                            bankIfsc,
                            gstNumber,
                            panNumber,
                            gstDoc,
                            panDoc,
                            licenseDoc
                     });
                     savedPartner = await this.hotelRepository.save(hotel);
                     partnerIdField = 'hotelId';
              }

              // Create the staff as OWNER and link to partner
              const staff = this.staffRepository.create({
                     name,
                     email,
                     passwordHash,
                     role: StaffRole.OWNER,
                     [partnerIdField]: savedPartner.id,
              });
              
              const savedStaff = await this.staffRepository.save(staff);

              // Generate token
              const token = this.generateToken(savedStaff);

              return {
                     message: 'Signup successful',
                     token,
                     staff: { id: savedStaff.id, email: savedStaff.email, name: savedStaff.name, role: savedStaff.role },
                     partner: { id: savedPartner.id, name: savedPartner.name, type: partnerType || 'HOTEL' },
              };
       }

       async login(loginDto: LoginDto) {
              const { email, password } = loginDto;

              const staff = await this.staffRepository.findOne({
                     where: { email },
                     relations: ['hotel', 'tourPartner']
              });
              if (!staff) {
                     throw new UnauthorizedException('Invalid credentials');
              }

              // Check account status across all verticals
              const partner = staff.hotel || staff.tourPartner;
              if (staff.role !== StaffRole.ADMIN && partner) {
                     if (partner.status === HotelStatus.PENDING || (partner as any).status === 'PENDING') {
                            throw new UnauthorizedException('We are verifying your details. Only approved accounts can login.');
                     } else if (partner.status === HotelStatus.REJECTED || (partner as any).status === 'REJECTED') {
                            throw new UnauthorizedException('Your registration was rejected. Please contact support.');
                     } else if (partner.status === HotelStatus.BLOCKED || (partner as any).status === 'BLOCKED') {
                            throw new UnauthorizedException('Your account has been blocked. Please contact support.');
                     }
              }

              const isPasswordValid = await bcrypt.compare(password, staff.passwordHash);
              if (!isPasswordValid) {
                     throw new UnauthorizedException('Invalid credentials');
              }

              const token = this.generateToken(staff);

              return {
                     message: 'Login successful',
                     token,
                     staff: { id: staff.id, email: staff.email, name: staff.name, role: staff.role },
              };
       }

       async changePassword(staffId: string, currentPass: string, newPass: string) {
              const staff = await this.staffRepository.findOne({ where: { id: staffId } });
              if (!staff) throw new UnauthorizedException('User not found');

              const isPasswordValid = await bcrypt.compare(currentPass, staff.passwordHash);
              if (!isPasswordValid) throw new BadRequestException('Invalid current password');

              const passwordHash = await bcrypt.hash(newPass, 10);
              await this.staffRepository.update(staffId, { passwordHash });
              return { message: 'Password updated successfully' };
       }

       private generateToken(staff: Staff) {
              const payload = {
                     sub: staff.id,
                     email: staff.email,
                     role: staff.role,
                     hotelId: staff.hotelId,
                     tourPartnerId: staff.tourPartnerId,
                     busVendorId: staff.busVendorId,
                     cabVendorId: staff.cabVendorId,
                     permissions: staff.permissions || {}
              };
              return this.jwtService.sign(payload);
       }
}
