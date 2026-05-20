import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { LedgerEntry } from './entities/ledger-entry.entity';
import { Invoice } from './entities/invoice.entity';
import { PayoutRequest } from './entities/payout-request.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LedgerEntry, Invoice, PayoutRequest])],
    controllers: [FinanceController],
    providers: [FinanceService],
    exports: [TypeOrmModule, FinanceService]
})
export class FinanceModule {}
