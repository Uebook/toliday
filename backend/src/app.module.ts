import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { InventoryModule } from './inventory/inventory.module';
import { BookingModule } from './booking/booking.module';
import { StatsModule } from './stats/stats.module';
import { RatesModule } from './rates/rates.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MediaModule } from './media/media.module';
import { AdminModule } from './admin/admin.module';
import { SupportModule } from './support/support.module';
import { MailModule } from './mail/mail.module';
import { PackagesModule } from './packages/packages.module';
import { BusesModule } from './buses/buses.module';
import { CabsModule } from './cabs/cabs.module';
import { FinanceModule } from './finance/finance.module';
import { PromotionsModule } from './promotions/promotions.module';
import { SettingsModule } from './settings/settings.module';
import { RoomModule } from './room/room.module';
import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReviewsModule } from './reviews/reviews.module';
import { GlobalInventoryModule } from './global-inventory/global-inventory.module';
import { HousekeepingModule } from './housekeeping/housekeeping.module';
import { CmsModule } from './cms/cms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST', '161.248.26.53'),
          port: configService.get<number>('DB_PORT', 3306),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', ''),
          database: configService.get<string>('DB_NAME', 'toliday'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          charset: 'utf8mb4',
          socketPath: undefined,
          extra: {
            authPlugins: {
              mysql_clear_password: () => () => Buffer.from(configService.get<string>('DB_PASSWORD', '') + '\0'),
              auth_gssapi_client: () => () => Buffer.from(configService.get<string>('DB_PASSWORD', '') + '\0')
            },
            authSwitchHandler: (data: any, cb: any) => {
              if (data.pluginName === 'auth_gssapi_client' || data.pluginName === 'mysql_clear_password') {
                cb(null, Buffer.from(configService.get<string>('DB_PASSWORD', '') + '\0'));
              } else {
                cb(new Error(`Unsupported auth plugin: ${data.pluginName}`));
              }
            }
          }
        };
      },
    }),
    HotelModule,
    StaffModule,
    AuthModule,
    RoomTypeModule,
    InventoryModule,
    BookingModule,
    StatsModule,
    RatesModule,
    NotificationsModule,
    MediaModule,
    AdminModule,
    SupportModule,
    MailModule,
    PackagesModule,
    BusesModule,
    CabsModule,
    FinanceModule,
    PromotionsModule,
    SettingsModule,
    RoomModule,
    PaymentModule,
    ReviewsModule,
    GlobalInventoryModule,
    HousekeepingModule,
    CmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
