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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRequest = void 0;
const typeorm_1 = require("typeorm");
const ledger_entry_entity_1 = require("./ledger-entry.entity");
let PayoutRequest = class PayoutRequest {
    id;
    vendorId;
    vertical;
    amount;
    status;
    bankReferenceNo;
    adminRemarks;
    createdAt;
    updatedAt;
};
exports.PayoutRequest = PayoutRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayoutRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayoutRequest.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ledger_entry_entity_1.VerticalType,
    }),
    __metadata("design:type", String)
], PayoutRequest.prototype, "vertical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PayoutRequest.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    __metadata("design:type", String)
], PayoutRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayoutRequest.prototype, "bankReferenceNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayoutRequest.prototype, "adminRemarks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PayoutRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PayoutRequest.prototype, "updatedAt", void 0);
exports.PayoutRequest = PayoutRequest = __decorate([
    (0, typeorm_1.Entity)('finance_payout_requests')
], PayoutRequest);
//# sourceMappingURL=payout-request.entity.js.map