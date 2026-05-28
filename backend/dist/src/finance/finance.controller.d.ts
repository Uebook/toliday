import { FinanceService } from './finance.service';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    private checkAdmin;
    getAllPayouts(req: any): Promise<import("./entities/payout-request.entity").PayoutRequest[]>;
    updatePayoutStatus(req: any, id: string, status: string): Promise<import("typeorm").UpdateResult>;
    getGlobalLedger(req: any): Promise<import("./entities/ledger-entry.entity").LedgerEntry[]>;
    private extractVendorContext;
    getBalances(req: any): Promise<{
        totalEarnings: number;
        availableBalance: number;
        pendingSettlements: number;
    }>;
    getLedger(req: any): Promise<import("./entities/ledger-entry.entity").LedgerEntry[]>;
    getPayouts(req: any): Promise<import("./entities/payout-request.entity").PayoutRequest[]>;
    requestPayout(req: any, amount: number): Promise<import("./entities/payout-request.entity").PayoutRequest>;
    getInvoices(req: any): Promise<import("./entities/invoice.entity").Invoice[]>;
}
