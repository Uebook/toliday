import { DataSource } from 'typeorm';
import { Staff } from './staff/entities/staff.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Inject environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '6gza7WP9mRRXEQzkGuIs',
  database: process.env.DB_NAME || 'postgres',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log('Connecting to database...');
  await AppDataSource.initialize();
  console.log('Connected!');

  const adminEmail = 'admin@toliday.com';
  const newPassword = 'adminpassword123';

  console.log(`Hashing new password...`);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  console.log(`Updating password and role to ADMIN in database...`);
  await AppDataSource.query(
    `UPDATE staffs SET "passwordHash" = $1, "role" = 'ADMIN' WHERE email = $2`,
    [hashedPassword, adminEmail]
  );
  
  console.log(`Success! Password for ${adminEmail} updated to: ${newPassword} and role set to ADMIN`);
  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error('Error running script:', err);
  process.exit(1);
});
