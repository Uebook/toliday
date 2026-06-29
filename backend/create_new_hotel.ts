import { createConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

async function run() {
    const caPath = process.env.DB_SSL_CA_PATH;
    let ca: string | undefined;
    if (caPath) {
        try { ca = fs.readFileSync(caPath).toString(); } catch (e) {}
    }

    const connection = await createConnection({
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
        const hotelId = uuidv4();
        const hotelEmail = 'demo.grand@toliday.in';
        const password = 'demoPassword123';
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Check if exists
        const existingStaff = await connection.query('SELECT id FROM staffs WHERE email = $1', [hotelEmail]);
        if (existingStaff.length > 0) {
            await connection.query('DELETE FROM staffs WHERE email = $1', [hotelEmail]);
        }
        await connection.query('DELETE FROM hotels WHERE email = $1', [hotelEmail]);

        // Insert Hotel
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

        // Insert Staff (Owner)
        const staffId = uuidv4();
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

    } catch (e) {
        console.error('Error creating hotel:', e);
    }
    await connection.close();
}

run().catch(console.error);
