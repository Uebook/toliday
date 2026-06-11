"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalInventoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const global_inventory_service_1 = require("./global-inventory.service");
const global_inventory_controller_1 = require("./global-inventory.controller");
const global_inventory_entity_1 = require("./entities/global-inventory.entity");
let GlobalInventoryModule = class GlobalInventoryModule {
};
exports.GlobalInventoryModule = GlobalInventoryModule;
exports.GlobalInventoryModule = GlobalInventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([global_inventory_entity_1.GlobalInventory])],
        controllers: [global_inventory_controller_1.GlobalInventoryController],
        providers: [global_inventory_service_1.GlobalInventoryService],
        exports: [global_inventory_service_1.GlobalInventoryService],
    })
], GlobalInventoryModule);
//# sourceMappingURL=global-inventory.module.js.map