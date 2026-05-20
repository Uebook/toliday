import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { NotificationSetting } from './entities/notification-setting.entity';

@Injectable()
export class NotificationsService {
       constructor(
              @InjectRepository(Notification)
              private notifRepository: Repository<Notification>,
              @InjectRepository(NotificationSetting)
              private settingsRepository: Repository<NotificationSetting>,
       ) { }

       async getSettings(hotelId: string) {
              let settings = await this.settingsRepository.findOne({ where: { hotelId } });
              if (!settings) {
                     settings = this.settingsRepository.create({ hotelId });
                     await this.settingsRepository.save(settings);
              }
              return settings;
       }

       async updateSettings(hotelId: string, dto: Partial<NotificationSetting>) {
              const settings = await this.getSettings(hotelId);
              Object.assign(settings, dto);
              return this.settingsRepository.save(settings);
       }

       findAll(hotelId: string) {
              return this.notifRepository.find({
                     where: { hotelId },
                     order: { createdAt: 'DESC' },
              });
       }

       async create(hotelId: string, dto: {
              type: NotificationType; title: string; message: string;
       }) {
              const notif = this.notifRepository.create({ ...dto, hotelId });
              return this.notifRepository.save(notif);
       }

       async markRead(id: string) {
              await this.notifRepository.update(id, { read: true });
              return { message: 'Marked as read' };
       }

       async markAllRead(hotelId: string) {
              await this.notifRepository.update({ hotelId, read: false }, { read: true });
              return { message: 'All marked as read' };
       }
}
