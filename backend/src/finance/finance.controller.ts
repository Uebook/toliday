import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FinanceService } from './finance.service';
import { VerticalType } from './entities/ledger-entry.entity';
import { StaffRole } from '../staff/entities/staff.entity';

@Controller('finance')
@UseGuards(JwtAuthGuard)
export class FinanceController {
    constructor(private readonly financeService: FinanceService) {}

    private checkAdmin(req: any) {
        if (req.user.role !== StaffRole.ADMIN) {
            throw new UnauthorizedException('Admin access required');
        }
    }

    // ... (existing helper and endpoints) ...

    @Get('admin/payouts')
    getAllPayouts(@Request() req: any) {
        this.checkAdmin(req);
        return this.financeService.findAllPayouts();
    }

    @Patch('admin/payouts/:id')
    updatePayoutStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: string) {
        this.checkAdmin(req);
        return this.financeService.updatePayoutStatus(id, status);
    }

    @Get('admin/ledger')
    getGlobalLedger(@Request() req: any) {
        this.checkAdmin(req);
        return this.financeService.findAllLedgerEntries();
    }

    // Helper to determine vendorId and vertical from JWT token
    private extractVendorContext(req: any) {
        if (req.user.hotelId) return { vendorId: req.user.hotelId, vertical: VerticalType.HOTEL };
        if (req.user.tourPartnerId) return { vendorId: req.user.tourPartnerId, vertical: VerticalType.PACKAGE };
        if (req.user.busVendorId) return { vendorId: req.user.busVendorId, vertical: VerticalType.BUS };
        if (req.user.cabVendorId) return { vendorId: req.user.cabVendorId, vertical: VerticalType.CAB };
        
        throw new Error('Could not determine vendor vertical');
    }

    @Get('balances')
    getBalances(@Request() req: any) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getBalances(vendorId, vertical);
    }

    @Get('ledger')
    getLedger(@Request() req: any) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getLedgerEntries(vendorId, vertical);
    }

    @Get('payouts')
    getPayouts(@Request() req: any) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getPayoutRequests(vendorId, vertical);
    }

    @Post('payouts')
    requestPayout(@Request() req: any, @Body('amount') amount: number) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.requestPayout(vendorId, vertical, amount);
    }

    @Get('invoices')
    getInvoices(@Request() req: any) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getInvoices(vendorId, vertical);
    }
}
