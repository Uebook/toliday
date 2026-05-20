import { createConnection } from 'typeorm';
import { TourPartner } from './src/packages/entities/tour-partner.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

async function check() {
    const connection = await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [TourPartner],
        synchronize: false,
    });

    const partners = await connection.getRepository(TourPartner).find();
    console.log('TOTAL PARTNERS:', partners.length);
    partners.forEach(p => console.log(`- ${p.businessName} (${p.email}) [${p.status}]`));
    
    await connection.close();
}

check().catch(console.error);
