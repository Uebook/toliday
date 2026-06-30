import { Repository } from 'typeorm';
import { LedgerEntry, VerticalType } from './entities/ledger-entry.entity';
import { Invoice } from './entities/invoice.entity';
import { PayoutRequest } from './entities/payout-request.entity';
export declare class FinanceService {
    private ledgerRepo;
    private invoiceRepo;
    private payoutRepo;
    constructor(ledgerRepo: Repository<LedgerEntry>, invoiceRepo: Repository<Invoice>, payoutRepo: Repository<PayoutRequest>);
    getBalances(vendorId: string, vertical: VerticalType): Promise<{
        totalEarnings: number;
        availableBalance: number;
        pendingSettlements: number;
    }>;
    getLedgerEntries(vendorId: string, vertical: VerticalType): Promise<LedgerEntry[]>;
    getPayoutRequests(vendorId: string, vertical: VerticalType): Promise<PayoutRequest[]>;
    requestPayout(vendorId: string, vertical: VerticalType, amount: number): Promise<PayoutRequest>;
    getInvoices(vendorId: string, vertical: VerticalType): Promise<Invoice[]>;
    getInvoiceById(id: string): Promise<Invoice | null>;
    findAllPayouts(): Promise<PayoutRequest[]>;
    updatePayoutStatus(id: string, status: any): Promise<import("typeorm").UpdateResult>;
    findAllLedgerEntries(vertical?: VerticalType): Promise<LedgerEntry[]>;
}
