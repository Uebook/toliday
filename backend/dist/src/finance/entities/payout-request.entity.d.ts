import { VerticalType } from './ledger-entry.entity';
export declare class PayoutRequest {
    id: string;
    vendorId: string;
    vertical: VerticalType;
    amount: number;
    status: string;
    bankReferenceNo: string;
    adminRemarks: string;
    createdAt: Date;
    updatedAt: Date;
}
