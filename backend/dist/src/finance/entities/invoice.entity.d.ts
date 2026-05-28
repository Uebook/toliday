import { VerticalType } from './ledger-entry.entity';
export declare class Invoice {
    id: string;
    vendorId: string;
    vertical: VerticalType;
    invoiceNumber: string;
    totalAmount: number;
    commissionAmount: number;
    gstAmount: number;
    tdsAmount: number;
    fileUrl: string;
    invoiceDate: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
