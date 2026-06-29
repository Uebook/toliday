import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

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
        const rows = await connection.query('SELECT email FROM staffs LIMIT 5');
        console.log('Valid staff emails in DB:', rows);
    } catch (e) {
        console.error('Query error:', e);
    }
    await connection.close();
}

run().catch(console.error);
