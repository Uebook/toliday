"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tour_partner_entity_1 = require("./entities/tour-partner.entity");
const tour_package_entity_1 = require("./entities/tour-package.entity");
const tour_entity_1 = require("./entities/tour.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const lead_entity_1 = require("./entities/lead.entity");
const itinerary_activity_entity_1 = require("./entities/itinerary-activity.entity");
const package_departure_entity_1 = require("./entities/package-departure.entity");
const package_tier_entity_1 = require("./entities/package-tier.entity");
const packages_controller_1 = require("./packages.controller");
const packages_service_1 = require("./packages.service");
let PackagesModule = class PackagesModule {
};
exports.PackagesModule = PackagesModule;
exports.PackagesModule = PackagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tour_partner_entity_1.TourPartner,
                tour_package_entity_1.TourPackage,
                tour_entity_1.Tour,
                booking_entity_1.Booking,
                lead_entity_1.Lead,
                itinerary_activity_entity_1.ItineraryActivity,
                package_departure_entity_1.PackageDeparture,
                package_tier_entity_1.PackageTier,
            ]),
        ],
        controllers: [packages_controller_1.PackagesController],
        providers: [packages_service_1.PackagesService],
        exports: [typeorm_1.TypeOrmModule, packages_service_1.PackagesService],
    })
], PackagesModule);
//# sourceMappingURL=packages.module.js.map