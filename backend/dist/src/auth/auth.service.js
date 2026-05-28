"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const staff_entity_1 = require("../staff/entities/staff.entity");
const hotel_entity_1 = require("../hotel/entities/hotel.entity");
const tour_partner_entity_1 = require("../packages/entities/tour-partner.entity");
const bus_vendor_entity_1 = require("../buses/entities/bus-vendor.entity");
const cab_vendor_entity_1 = require("../cabs/entities/cab-vendor.entity");
const fs = __importStar(require("fs"));
let AuthService = class AuthService {
    staffRepository;
    hotelRepository;
    tourPartnerRepository;
    busVendorRepository;
    cabVendorRepository;
    jwtService;
    constructor(staffRepository, hotelRepository, tourPartnerRepository, busVendorRepository, cabVendorRepository, jwtService) {
        this.staffRepository = staffRepository;
        this.hotelRepository = hotelRepository;
        this.tourPartnerRepository = tourPartnerRepository;
        this.busVendorRepository = busVendorRepository;
        this.cabVendorRepository = cabVendorRepository;
        this.jwtService = jwtService;
    }
    logDebug(message) {
        const logEntry = `[${new Date().toISOString()}] (Service) ${message}\n`;
        try {
            fs.appendFileSync('signup_debug.log', logEntry);
        }
        catch (e) { }
    }
    async signup(signUpDto) {
        const { email, password, name, hotelName, contactNumber, ownerFirstName, ownerLastName, ownerPhone, businessName, businessType, city, bankHolder, bankName, bankAccount, bankIfsc, gstNumber, panNumber, gstDoc, panDoc, licenseDoc, partnerType, tourismLicenseNumber, registrationNumber, website, yearsInOperation, operatingArea, } = signUpDto;
        this.logDebug(`AuthService.signup for ${email} as ${partnerType}`);
        const existingStaff = await this.staffRepository.findOne({
            where: { email },
        });
        if (existingStaff) {
            throw new common_1.BadRequestException('Email already in use.');
        }
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltOrRounds);
        let savedPartner;
        let partnerIdField = 'hotelId';
        if (partnerType === 'SITESEEING' || partnerType === 'PACKAGES') {
            const tourPartner = this.tourPartnerRepository.create({
                name: businessName || name,
                businessName,
                businessType: businessType ||
                    (partnerType === 'SITESEEING' ? 'Tour Operator' : 'Travel Agency'),
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
                operatingArea,
            });
            savedPartner = await this.tourPartnerRepository.save(tourPartner);
            partnerIdField = 'tourPartnerId';
        }
        else if (partnerType === 'BUS') {
            const busVendor = this.busVendorRepository.create({
                name: businessName || name,
                email,
                contactNumber,
                address: city,
                gstNumber,
                panNumber,
            });
            savedPartner = await this.busVendorRepository.save(busVendor);
            partnerIdField = 'busVendorId';
        }
        else if (partnerType === 'CAB') {
            const cabVendor = this.cabVendorRepository.create({
                name: businessName || name,
                email,
                phone: contactNumber,
                address: city,
                gstNumber,
                panNumber,
            });
            savedPartner = await this.cabVendorRepository.save(cabVendor);
            partnerIdField = 'cabVendorId';
        }
        else {
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
                licenseDoc,
            });
            savedPartner = await this.hotelRepository.save(hotel);
            partnerIdField = 'hotelId';
        }
        const staff = this.staffRepository.create({
            name,
            email,
            passwordHash,
            role: staff_entity_1.StaffRole.OWNER,
            [partnerIdField]: savedPartner.id,
        });
        const savedStaff = await this.staffRepository.save(staff);
        const token = this.generateToken(savedStaff);
        return {
            message: 'Signup successful',
            token,
            staff: {
                id: savedStaff.id,
                email: savedStaff.email,
                name: savedStaff.name,
                role: savedStaff.role,
            },
            partner: {
                id: savedPartner.id,
                name: savedPartner.name,
                type: partnerType || 'HOTEL',
            },
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const staff = await this.staffRepository.findOne({
            where: { email },
            relations: ['hotel', 'tourPartner'],
        });
        if (!staff) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const partner = staff.hotel || staff.tourPartner;
        if (staff.role !== staff_entity_1.StaffRole.ADMIN && partner) {
            if (partner.status === hotel_entity_1.HotelStatus.PENDING ||
                partner.status === 'PENDING') {
                throw new common_1.UnauthorizedException('We are verifying your details. Only approved accounts can login.');
            }
            else if (partner.status === hotel_entity_1.HotelStatus.REJECTED ||
                partner.status === 'REJECTED') {
                throw new common_1.UnauthorizedException('Your registration was rejected. Please contact support.');
            }
            else if (partner.status === hotel_entity_1.HotelStatus.BLOCKED ||
                partner.status === 'BLOCKED') {
                throw new common_1.UnauthorizedException('Your account has been blocked. Please contact support.');
            }
        }
        const isPasswordValid = await bcrypt.compare(password, staff.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateToken(staff);
        return {
            message: 'Login successful',
            token,
            staff: {
                id: staff.id,
                email: staff.email,
                name: staff.name,
                role: staff.role,
            },
        };
    }
    async changePassword(staffId, currentPass, newPass) {
        const staff = await this.staffRepository.findOne({
            where: { id: staffId },
        });
        if (!staff)
            throw new common_1.UnauthorizedException('User not found');
        const isPasswordValid = await bcrypt.compare(currentPass, staff.passwordHash);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Invalid current password');
        const passwordHash = await bcrypt.hash(newPass, 10);
        await this.staffRepository.update(staffId, { passwordHash });
        return { message: 'Password updated successfully' };
    }
    generateToken(staff) {
        const payload = {
            sub: staff.id,
            email: staff.email,
            role: staff.role,
            hotelId: staff.hotelId,
            tourPartnerId: staff.tourPartnerId,
            busVendorId: staff.busVendorId,
            cabVendorId: staff.cabVendorId,
            permissions: staff.permissions || {},
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __param(2, (0, typeorm_1.InjectRepository)(tour_partner_entity_1.TourPartner)),
    __param(3, (0, typeorm_1.InjectRepository)(bus_vendor_entity_1.BusVendor)),
    __param(4, (0, typeorm_1.InjectRepository)(cab_vendor_entity_1.CabVendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map