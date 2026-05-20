import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LedgerEntry, LedgerEntryType, VerticalType } from './entities/ledger-entry.entity';
import { Invoice } from './entities/invoice.entity';
import { PayoutRequest } from './entities/payout-request.entity';

@Injectable()
export class FinanceService {
    constructor(
        @InjectRepository(LedgerEntry)
        private ledgerRepo: Repository<LedgerEntry>,
        @InjectRepository(Invoice)
        private invoiceRepo: Repository<Invoice>,
        @InjectRepository(PayoutRequest)
        private payoutRepo: Repository<PayoutRequest>,
    ) {}

    // Wallet Balances
    async getBalances(vendorId: string, vertical: VerticalType) {
        const entries = await this.ledgerRepo.find({ where: { vendorId, vertical, status: 'COMPLETED' } });
        
        let totalEarnings = 0;
        let availableBalance = 0;

        entries.forEach(entry => {
            if (entry.type === LedgerEntryType.CREDIT) {
                totalEarnings += Number(entry.amount);
                availableBalance += Number(entry.amount);
            } else if (entry.type === LedgerEntryType.DEBIT) {
                availableBalance -= Number(entry.amount);
            }
        });

        // Calculate pending settlements (Payouts in PENDING/PROCESSING state)
        const pendingPayouts = await this.payoutRepo.find({ 
            where: [
                { vendorId, vertical, status: 'PENDING' },
                { vendorId, vertical, status: 'PROCESSING' }
            ]
        });

        const pendingSettlements = pendingPayouts.reduce((acc, req) => acc + Number(req.amount), 0);

        return {
            totalEarnings,
            availableBalance,
            pendingSettlements
        };
    }

    // Ledger Statements
    async getLedgerEntries(vendorId: string, vertical: VerticalType) {
        return this.ledgerRepo.find({ 
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' }
        });
    }

    // Payout Requests
    async getPayoutRequests(vendorId: string, vertical: VerticalType) {
        return this.payoutRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' }
        });
    }

    async requestPayout(vendorId: string, vertical: VerticalType, amount: number) {
        // Validate balance
        const balances = await this.getBalances(vendorId, vertical);
        if (amount > balances.availableBalance) {
            throw new BadRequestException('Requested amount exceeds available balance');
        }

        if (amount <= 0) {
            throw new BadRequestException('Amount must be greater than 0');
        }

        // Create Payout Request
        const request = this.payoutRepo.create({
            vendorId,
            vertical,
            amount,
            status: 'PENDING'
        });

        const savedRequest = await this.payoutRepo.save(request);

        // Deduct from ledger immediately
        const ledgerDebit = this.ledgerRepo.create({
            vendorId,
            vertical,
            type: LedgerEntryType.DEBIT,
            amount,
            description: `Withdrawal Request #${savedRequest.id.substring(0,8)}`,
            referenceId: savedRequest.id,
            status: 'COMPLETED'
        });

        await this.ledgerRepo.save(ledgerDebit);

        return savedRequest;
    }

    // Invoices
    async getInvoices(vendorId: string, vertical: VerticalType) {
        return this.invoiceRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' }
        });
    }

    // Admin Methods
    async findAllPayouts() {
        return this.payoutRepo.find({
            order: { createdAt: 'DESC' }
        });
    }

    async updatePayoutStatus(id: string, status: any) {
        return this.payoutRepo.update(id, { status });
    }

    async findAllLedgerEntries() {
        return this.ledgerRepo.find({
            order: { createdAt: 'DESC' },
            take: 100
        });
    }
}
