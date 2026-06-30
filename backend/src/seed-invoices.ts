import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Invoice } from './finance/entities/invoice.entity';
import { VerticalType } from './finance/entities/ledger-entry.entity';

dotenv.config();

const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';

async function seedInvoices() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    ssl: { rejectUnauthorized: false },
    synchronize: false,
  });

  const invoiceRepo = connection.getRepository(Invoice);

  // Clear existing invoices for this hotel to avoid conflicts
  await invoiceRepo.delete({ vendorId: HOTEL_ID });

  const invoices = [
    {
      vendorId: HOTEL_ID,
      vertical: VerticalType.HOTEL,
      invoiceNumber: 'INV/2026/001',
      totalAmount: 11200.00,
      commissionAmount: 1120.00,
      gstAmount: 201.60,
      tdsAmount: 112.00,
      invoiceDate: '2026-06-30',
      status: 'UNPAID',
    },
    {
      vendorId: HOTEL_ID,
      vertical: VerticalType.HOTEL,
      invoiceNumber: 'INV/2026/002',
      totalAmount: 8500.00,
      commissionAmount: 850.00,
      gstAmount: 153.00,
      tdsAmount: 85.00,
      invoiceDate: '2026-06-15',
      status: 'PAID',
    },
    {
      vendorId: HOTEL_ID,
      vertical: VerticalType.HOTEL,
      invoiceNumber: 'INV/2026/003',
      totalAmount: 15600.00,
      commissionAmount: 1560.00,
      gstAmount: 280.80,
      tdsAmount: 156.00,
      invoiceDate: '2026-05-31',
      status: 'PAID',
    },
  ];

  console.log('🌱 Seeding Tax Invoices in the database...');
  for (const invData of invoices) {
    const inv = invoiceRepo.create(invData);
    await invoiceRepo.save(inv);
    console.log(`Saved invoice: ${inv.invoiceNumber}`);
  }

  console.log('✅ Invoices seeded successfully!');
  await connection.close();
}

seedInvoices().catch(console.error);
