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
const dotenv = __importStar(require("dotenv"));
const invoice_entity_1 = require("./finance/entities/invoice.entity");
const ledger_entry_entity_1 = require("./finance/entities/ledger-entry.entity");
dotenv.config();
const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';
async function seedInvoices() {
    const connection = await (0, typeorm_1.createConnection)({
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
    const invoiceRepo = connection.getRepository(invoice_entity_1.Invoice);
    await invoiceRepo.delete({ vendorId: HOTEL_ID });
    const invoices = [
        {
            vendorId: HOTEL_ID,
            vertical: ledger_entry_entity_1.VerticalType.HOTEL,
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
            vertical: ledger_entry_entity_1.VerticalType.HOTEL,
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
            vertical: ledger_entry_entity_1.VerticalType.HOTEL,
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
//# sourceMappingURL=seed-invoices.js.map