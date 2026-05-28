"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_controller_1 = require("./hotel.controller");
const public_hotel_controller_1 = require("./public-hotel.controller");
const hotel_service_1 = require("./hotel.service");
const hotel_entity_1 = require("./entities/hotel.entity");
const rate_plan_entity_1 = require("./entities/rate-plan.entity");
const review_entity_1 = require("./entities/review.entity");
const promotions_module_1 = require("../promotions/promotions.module");
let HotelModule = class HotelModule {
};
exports.HotelModule = HotelModule;
exports.HotelModule = HotelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([hotel_entity_1.Hotel, rate_plan_entity_1.RatePlan, review_entity_1.Review]),
            promotions_module_1.PromotionsModule,
        ],
        controllers: [hotel_controller_1.HotelController, public_hotel_controller_1.PublicHotelController],
        providers: [hotel_service_1.HotelService],
        exports: [typeorm_1.TypeOrmModule],
    })
], HotelModule);
//# sourceMappingURL=hotel.module.js.map