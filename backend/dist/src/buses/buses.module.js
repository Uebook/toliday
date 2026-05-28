"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const buses_service_1 = require("./buses.service");
const buses_controller_1 = require("./buses.controller");
const bus_vendor_entity_1 = require("./entities/bus-vendor.entity");
const bus_entity_1 = require("./entities/bus.entity");
const bus_route_entity_1 = require("./entities/bus-route.entity");
const bus_schedule_entity_1 = require("./entities/bus-schedule.entity");
const seat_layout_entity_1 = require("./entities/seat-layout.entity");
const public_buses_controller_1 = require("./public-buses.controller");
const bus_booking_entity_1 = require("./entities/bus-booking.entity");
const yield_rule_entity_1 = require("./entities/yield-rule.entity");
const crew_entity_1 = require("./entities/crew.entity");
let BusesModule = class BusesModule {
};
exports.BusesModule = BusesModule;
exports.BusesModule = BusesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                bus_vendor_entity_1.BusVendor,
                bus_entity_1.Bus,
                bus_route_entity_1.BusRoute,
                bus_schedule_entity_1.BusSchedule,
                seat_layout_entity_1.SeatLayout,
                crew_entity_1.Crew,
                bus_booking_entity_1.BusBooking,
                yield_rule_entity_1.YieldRule,
            ]),
        ],
        controllers: [buses_controller_1.BusesController, public_buses_controller_1.PublicBusesController],
        providers: [buses_service_1.BusesService],
        exports: [buses_service_1.BusesService],
    })
], BusesModule);
//# sourceMappingURL=buses.module.js.map