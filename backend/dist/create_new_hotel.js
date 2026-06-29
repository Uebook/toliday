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
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
dotenv.config();
async function run() {
    const caPath = process.env.DB_SSL_CA_PATH;
    let ca;
    if (caPath) {
        try {
            ca = fs.readFileSync(caPath).toString();
        }
        catch (e) { }
    }
    const connection = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: ca ? { rejectUnauthorized: true, ca } : { rejectUnauthorized: false },
        synchronize: false,
    });
    try {
        const hotelId = (0, uuid_1.v4)();
        const hotelEmail = 'demo.grand@toliday.in';
        const password = 'demoPassword123';
        const passwordHash = await bcrypt.hash(password, 10);
        const existingStaff = await connection.query('SELECT id FROM staffs WHERE email = $1', [hotelEmail]);
        if (existingStaff.length > 0) {
            await connection.query('DELETE FROM staffs WHERE email = $1', [hotelEmail]);
        }
        await connection.query('DELETE FROM hotels WHERE email = $1', [hotelEmail]);
        await connection.query(`
            INSERT INTO hotels 
            (id, name, description, address, city, "pinCode", "contactNumber", email, stars, "checkInTime", "checkOutTime", amenities, images, "ownerFirstName", "ownerLastName", "isVerified", status, "createdAt", "updatedAt") 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW(), NOW())
        `, [
            hotelId,
            'The Grand Demo Hotel',
            'A luxurious demo hotel created specifically for testing purposes.',
            '123 Demo Street',
            'New Delhi',
            '110001',
            '9876543210',
            hotelEmail,
            5,
            '14:00',
            '11:00',
            JSON.stringify(['wifi', 'pool', 'gym', 'spa']),
            JSON.stringify(['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80']),
            'Demo',
            'Owner',
            true,
            'APPROVED'
        ]);
        const staffId = (0, uuid_1.v4)();
        await connection.query(`
            INSERT INTO staffs 
            (id, name, email, "passwordHash", role, "hotelId", "isActive", "createdAt", "updatedAt") 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        `, [
            staffId,
            'Demo Owner',
            hotelEmail,
            passwordHash,
            'OWNER',
            hotelId,
            true
        ]);
        console.log('--- CREATED HOTEL & STAFF ---');
        console.log('Hotel Name:', 'The Grand Demo Hotel');
        console.log('Email:', hotelEmail);
        console.log('Password:', password);
        console.log('-----------------------------');
    }
    catch (e) {
        console.error('Error creating hotel:', e);
    }
    await connection.close();
}
run().catch(console.error);
//# sourceMappingURL=create_new_hotel.js.map