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
exports.LedgerEntry = exports.LedgerEntryType = exports.VerticalType = void 0;
const typeorm_1 = require("typeorm");
var VerticalType;
(function (VerticalType) {
    VerticalType["HOTEL"] = "HOTEL";
    VerticalType["PACKAGE"] = "PACKAGE";
    VerticalType["BUS"] = "BUS";
    VerticalType["CAB"] = "CAB";
})(VerticalType || (exports.VerticalType = VerticalType = {}));
var LedgerEntryType;
(function (LedgerEntryType) {
    LedgerEntryType["CREDIT"] = "CREDIT";
    LedgerEntryType["DEBIT"] = "DEBIT";
})(LedgerEntryType || (exports.LedgerEntryType = LedgerEntryType = {}));
let LedgerEntry = class LedgerEntry {
    id;
    vendorId;
    vertical;
    type;
    amount;
    description;
    referenceId;
    status;
    createdAt;
    updatedAt;
};
exports.LedgerEntry = LedgerEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LedgerEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LedgerEntry.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: VerticalType,
    }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "vertical", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LedgerEntryType,
    }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LedgerEntry.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LedgerEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'COMPLETED' }),
    __metadata("design:type", String)
], LedgerEntry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LedgerEntry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LedgerEntry.prototype, "updatedAt", void 0);
exports.LedgerEntry = LedgerEntry = __decorate([
    (0, typeorm_1.Entity)('finance_ledger_entries')
], LedgerEntry);
//# sourceMappingURL=ledger-entry.entity.js.map