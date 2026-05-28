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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const typeorm_1 = require("@nestjs/typeorm");
const staff_entity_1 = require("../src/staff/entities/staff.entity");
const hotel_entity_1 = require("../src/hotel/entities/hotel.entity");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const staffRepository = app.get((0, typeorm_1.getRepositoryToken)(staff_entity_1.Staff));
    const hotelRepository = app.get((0, typeorm_1.getRepositoryToken)(hotel_entity_1.Hotel));
    const email = 'admin@gmail.com';
    const password = '12345678';
    const name = 'System Admin';
    try {
        let staff = await staffRepository.findOne({ where: { email } });
        const passwordHash = await bcrypt.hash(password, 10);
        if (staff) {
            console.log('Admin user exists. Updating password...');
            staff.passwordHash = passwordHash;
        }
        else {
            console.log('Creating new admin user...');
            let hotel = await hotelRepository.findOne({ where: {} });
            if (!hotel) {
                console.log('No hotels found. Creating a default Admin Hotel...');
                hotel = hotelRepository.create({
                    name: 'Admin Hotel',
                    email: 'admin-hotel@gmail.com',
                    isVerified: true,
                });
                hotel = await hotelRepository.save(hotel);
            }
            staff = staffRepository.create({
                name,
                email,
                passwordHash,
                role: staff_entity_1.StaffRole.ADMIN,
                hotelId: hotel.id,
                isActive: true,
                permissions: {
                    all: true,
                    dashboard_view: true,
                    notifications_view: true,
                    property_view: true,
                    property_edit: true,
                    inventory_view: true,
                    inventory_edit: true,
                    rates_view: true,
                    rates_edit: true,
                    bookings_view: true,
                    bookings_modify: true,
                    staff_manage: true,
                    payments_view: true,
                    reports_view: true,
                    profile_view: true,
                    settings_edit: true,
                    support_view: true,
                }
            });
        }
        await staffRepository.save(staff);
        console.log(`Admin user ${staff ? 'updated' : 'created'} successfully: ${email}`);
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=create-admin.js.map