import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Staff, StaffRole } from '../staff/entities/staff.entity';
import { Hotel } from '../hotel/entities/hotel.entity';
import { TourPartner } from '../packages/entities/tour-partner.entity';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { BusVendor } from '../buses/entities/bus-vendor.entity';
import { CabVendor } from '../cabs/entities/cab-vendor.entity';
import { WhatsappService } from '../whatsapp/whatsapp.service';
export declare class AuthService {
    private staffRepository;
    private hotelRepository;
    private tourPartnerRepository;
    private busVendorRepository;
    private cabVendorRepository;
    private jwtService;
    private whatsappService;
    constructor(staffRepository: Repository<Staff>, hotelRepository: Repository<Hotel>, tourPartnerRepository: Repository<TourPartner>, busVendorRepository: Repository<BusVendor>, cabVendorRepository: Repository<CabVendor>, jwtService: JwtService, whatsappService: WhatsappService);
    private logDebug;
    signup(signUpDto: SignUpDto): Promise<{
        message: string;
        token: string;
        staff: {
            id: string;
            email: string;
            name: string;
            role: StaffRole;
        };
        partner: {
            id: any;
            name: any;
            type: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        staff: {
            id: string;
            email: string;
            name: string;
            role: StaffRole;
        };
    }>;
    changePassword(staffId: string, currentPass: string, newPass: string): Promise<{
        message: string;
    }>;
    private generateToken;
}
