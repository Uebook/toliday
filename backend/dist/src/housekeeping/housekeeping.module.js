"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousekeepingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const housekeeping_controller_1 = require("./housekeeping.controller");
const housekeeping_service_1 = require("./housekeeping.service");
const housekeeping_entity_1 = require("./entities/housekeeping.entity");
let HousekeepingModule = class HousekeepingModule {
};
exports.HousekeepingModule = HousekeepingModule;
exports.HousekeepingModule = HousekeepingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([housekeeping_entity_1.Housekeeping])],
        controllers: [housekeeping_controller_1.HousekeepingController],
        providers: [housekeeping_service_1.HousekeepingService],
    })
], HousekeepingModule);
//# sourceMappingURL=housekeeping.module.js.map