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
exports.RatePlan = exports.MealPlan = void 0;
const typeorm_1 = require("typeorm");
const room_type_entity_1 = require("../../room-type/entities/room-type.entity");
var MealPlan;
(function (MealPlan) {
    MealPlan["EP"] = "EP";
    MealPlan["CP"] = "CP";
    MealPlan["MAP"] = "MAP";
    MealPlan["AP"] = "AP";
})(MealPlan || (exports.MealPlan = MealPlan = {}));
let RatePlan = class RatePlan {
    id;
    name;
    mealPlan;
    markupAmount;
    markupPercentage;
    isRefundable;
    cancellationPolicy;
    inclusions;
    roomTypeId;
    roomType;
    isActive;
    createdAt;
    updatedAt;
};
exports.RatePlan = RatePlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RatePlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RatePlan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MealPlan,
        default: MealPlan.EP,
    }),
    __metadata("design:type", String)
], RatePlan.prototype, "mealPlan", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RatePlan.prototype, "markupAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RatePlan.prototype, "markupPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RatePlan.prototype, "isRefundable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RatePlan.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], RatePlan.prototype, "inclusions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RatePlan.prototype, "roomTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_type_entity_1.RoomType, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'roomTypeId' }),
    __metadata("design:type", room_type_entity_1.RoomType)
], RatePlan.prototype, "roomType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RatePlan.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RatePlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RatePlan.prototype, "updatedAt", void 0);
exports.RatePlan = RatePlan = __decorate([
    (0, typeorm_1.Entity)('rate_plans')
], RatePlan);
//# sourceMappingURL=rate-plan.entity.js.map