"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const fs = __importStar(require("fs"));
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const hotel_module_1 = require("./hotel/hotel.module");
const staff_module_1 = require("./staff/staff.module");
const auth_module_1 = require("./auth/auth.module");
const room_type_module_1 = require("./room-type/room-type.module");
const inventory_module_1 = require("./inventory/inventory.module");
const booking_module_1 = require("./booking/booking.module");
const stats_module_1 = require("./stats/stats.module");
const rates_module_1 = require("./rates/rates.module");
const notifications_module_1 = require("./notifications/notifications.module");
const media_module_1 = require("./media/media.module");
const admin_module_1 = require("./admin/admin.module");
const support_module_1 = require("./support/support.module");
const mail_module_1 = require("./mail/mail.module");
const packages_module_1 = require("./packages/packages.module");
const buses_module_1 = require("./buses/buses.module");
const cabs_module_1 = require("./cabs/cabs.module");
const finance_module_1 = require("./finance/finance.module");
const promotions_module_1 = require("./promotions/promotions.module");
const settings_module_1 = require("./settings/settings.module");
const room_module_1 = require("./room/room.module");
const payment_module_1 = require("./payment/payment.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const caPath = configService.get('DB_SSL_CA_PATH');
                    console.log(`DB SSL CA Path: ${caPath}`);
                    let ca;
                    if (caPath) {
                        try {
                            ca = fs.readFileSync(caPath).toString();
                            console.log('Successfully read SSL CA certificate');
                        }
                        catch (error) {
                            console.error(`Failed to read SSL CA certificate at ${caPath}:`, error.message);
                        }
                    }
                    else {
                        console.warn('DB_SSL_CA_PATH is not defined');
                    }
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USER'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        ssl: ca
                            ? {
                                rejectUnauthorized: true,
                                ca,
                            }
                            : {
                                rejectUnauthorized: false,
                            },
                        autoLoadEntities: true,
                        synchronize: true,
                        connectTimeoutMS: 5000,
                    };
                },
            }),
            hotel_module_1.HotelModule,
            staff_module_1.StaffModule,
            auth_module_1.AuthModule,
            room_type_module_1.RoomTypeModule,
            inventory_module_1.InventoryModule,
            booking_module_1.BookingModule,
            stats_module_1.StatsModule,
            rates_module_1.RatesModule,
            notifications_module_1.NotificationsModule,
            media_module_1.MediaModule,
            admin_module_1.AdminModule,
            support_module_1.SupportModule,
            mail_module_1.MailModule,
            packages_module_1.PackagesModule,
            buses_module_1.BusesModule,
            cabs_module_1.CabsModule,
            finance_module_1.FinanceModule,
            promotions_module_1.PromotionsModule,
            settings_module_1.SettingsModule,
            room_module_1.RoomModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map