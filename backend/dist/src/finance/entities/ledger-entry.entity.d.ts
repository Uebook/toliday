export declare enum VerticalType {
    HOTEL = "HOTEL",
    PACKAGE = "PACKAGE",
    BUS = "BUS",
    CAB = "CAB"
}
export declare enum LedgerEntryType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT"
}
export declare class LedgerEntry {
    id: string;
    vendorId: string;
    vertical: VerticalType;
    type: LedgerEntryType;
    amount: number;
    description: string;
    referenceId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
