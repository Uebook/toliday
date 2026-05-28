"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const hotel_entity_1 = require("../hotel/entities/hotel.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const staff_entity_1 = require("../staff/entities/staff.entity");
const support_module_1 = require("../support/support.module");
const tour_partner_entity_1 = require("../packages/entities/tour-partner.entity");
const bus_vendor_entity_1 = require("../buses/entities/bus-vendor.entity");
const cab_vendor_entity_1 = require("../cabs/entities/cab-vendor.entity");
const bus_booking_entity_1 = require("../buses/entities/bus-booking.entity");
const cab_booking_entity_1 = require("../cabs/entities/cab-booking.entity");
const promotion_entity_1 = require("../promotions/entities/promotion.entity");
const room_type_entity_1 = require("../room-type/entities/room-type.entity");
const tour_package_entity_1 = require("../packages/entities/tour-package.entity");
const bus_entity_1 = require("../buses/entities/bus.entity");
const vehicle_entity_1 = require("../cabs/entities/vehicle.entity");
const global_setting_entity_1 = require("../settings/entities/global-setting.entity");
const ledger_entry_entity_1 = require("../finance/entities/ledger-entry.entity");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                hotel_entity_1.Hotel,
                booking_entity_1.Booking,
                staff_entity_1.Staff,
                tour_partner_entity_1.TourPartner,
                bus_vendor_entity_1.BusVendor,
                cab_vendor_entity_1.CabVendor,
                bus_booking_entity_1.BusBooking,
                cab_booking_entity_1.CabBooking,
                promotion_entity_1.Promotion,
                room_type_entity_1.RoomType,
                tour_package_entity_1.TourPackage,
                bus_entity_1.Bus,
                vehicle_entity_1.Vehicle,
                global_setting_entity_1.GlobalSetting,
                ledger_entry_entity_1.LedgerEntry,
            ]),
            support_module_1.SupportModule,
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map