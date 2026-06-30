"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ledger_entry_entity_1 = require("./entities/ledger-entry.entity");
const invoice_entity_1 = require("./entities/invoice.entity");
const payout_request_entity_1 = require("./entities/payout-request.entity");
let FinanceService = class FinanceService {
    ledgerRepo;
    invoiceRepo;
    payoutRepo;
    constructor(ledgerRepo, invoiceRepo, payoutRepo) {
        this.ledgerRepo = ledgerRepo;
        this.invoiceRepo = invoiceRepo;
        this.payoutRepo = payoutRepo;
    }
    async getBalances(vendorId, vertical) {
        const entries = await this.ledgerRepo.find({
            where: { vendorId, vertical, status: 'COMPLETED' },
        });
        let totalEarnings = 0;
        let availableBalance = 0;
        entries.forEach((entry) => {
            if (entry.type === ledger_entry_entity_1.LedgerEntryType.CREDIT) {
                totalEarnings += Number(entry.amount);
                availableBalance += Number(entry.amount);
            }
            else if (entry.type === ledger_entry_entity_1.LedgerEntryType.DEBIT) {
                availableBalance -= Number(entry.amount);
            }
        });
        const pendingPayouts = await this.payoutRepo.find({
            where: [
                { vendorId, vertical, status: 'PENDING' },
                { vendorId, vertical, status: 'PROCESSING' },
            ],
        });
        const pendingSettlements = pendingPayouts.reduce((acc, req) => acc + Number(req.amount), 0);
        return {
            totalEarnings,
            availableBalance,
            pendingSettlements,
        };
    }
    async getLedgerEntries(vendorId, vertical) {
        return this.ledgerRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' },
        });
    }
    async getPayoutRequests(vendorId, vertical) {
        return this.payoutRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' },
        });
    }
    async requestPayout(vendorId, vertical, amount) {
        const balances = await this.getBalances(vendorId, vertical);
        if (amount > balances.availableBalance) {
            throw new common_1.BadRequestException('Requested amount exceeds available balance');
        }
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be greater than 0');
        }
        const request = this.payoutRepo.create({
            vendorId,
            vertical,
            amount,
            status: 'PENDING',
        });
        const savedRequest = await this.payoutRepo.save(request);
        const ledgerDebit = this.ledgerRepo.create({
            vendorId,
            vertical,
            type: ledger_entry_entity_1.LedgerEntryType.DEBIT,
            amount,
            description: `Withdrawal Request #${savedRequest.id.substring(0, 8)}`,
            referenceId: savedRequest.id,
            status: 'COMPLETED',
        });
        await this.ledgerRepo.save(ledgerDebit);
        return savedRequest;
    }
    async getInvoices(vendorId, vertical) {
        return this.invoiceRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' },
        });
    }
    async getInvoiceById(id) {
        return this.invoiceRepo.findOne({
            where: { id },
        });
    }
    async findAllPayouts() {
        return this.payoutRepo.find({
            order: { createdAt: 'DESC' },
        });
    }
    async updatePayoutStatus(id, status) {
        return this.payoutRepo.update(id, { status });
    }
    async findAllLedgerEntries(vertical) {
        const where = vertical ? { vertical } : {};
        return this.ledgerRepo.find({
            where,
            order: { createdAt: 'DESC' },
            take: 100,
        });
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ledger_entry_entity_1.LedgerEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(2, (0, typeorm_1.InjectRepository)(payout_request_entity_1.PayoutRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FinanceService);
//# sourceMappingURL=finance.service.js.map