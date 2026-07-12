"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
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
const reviews_module_1 = require("./reviews/reviews.module");
const global_inventory_module_1 = require("./global-inventory/global-inventory.module");
const housekeeping_module_1 = require("./housekeeping/housekeeping.module");
const cms_module_1 = require("./cms/cms.module");
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
                    return {
                        type: 'mysql',
                        host: configService.get('DB_HOST', 'localhost'),
                        port: configService.get('DB_PORT', 3306),
                        username: configService.get('DB_USERNAME', 'root'),
                        password: configService.get('DB_PASSWORD', ''),
                        database: configService.get('DB_NAME', 'toliday'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: true,
                        charset: 'utf8mb4',
                        socketPath: undefined,
                        extra: {
                            authPlugins: {
                                mysql_clear_password: () => () => Buffer.from(configService.get('DB_PASSWORD', '') + '\0'),
                                auth_gssapi_client: () => () => Buffer.from(configService.get('DB_PASSWORD', '') + '\0')
                            },
                            authSwitchHandler: (data, cb) => {
                                if (data.pluginName === 'auth_gssapi_client' || data.pluginName === 'mysql_clear_password') {
                                    cb(null, Buffer.from(configService.get('DB_PASSWORD', '') + '\0'));
                                }
                                else {
                                    cb(new Error(`Unsupported auth plugin: ${data.pluginName}`));
                                }
                            }
                        }
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
            reviews_module_1.ReviewsModule,
            global_inventory_module_1.GlobalInventoryModule,
            housekeeping_module_1.HousekeepingModule,
            cms_module_1.CmsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map