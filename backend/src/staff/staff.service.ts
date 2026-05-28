import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff, StaffRole } from './entities/staff.entity';
import { Hotel } from '../hotel/entities/hotel.entity';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private mailService: MailService,
  ) {}

  async findAll(
    hotelId?: string,
    tourPartnerId?: string,
    busVendorId?: string,
    cabVendorId?: string,
  ) {
    const where: any = {};
    if (tourPartnerId) where.tourPartnerId = tourPartnerId;
    else if (busVendorId) where.busVendorId = busVendorId;
    else if (cabVendorId) where.cabVendorId = cabVendorId;
    else if (hotelId) where.hotelId = hotelId;

    const list = await this.staffRepository.find({
      where,
      order: { createdAt: 'ASC' },
    });
    return list.map((s) => this.sanitize(s));
  }

  async findOne(id: string) {
    const s = await this.staffRepository.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Staff member not found');
    return this.sanitize(s);
  }

  async create(
    partnerId: string,
    type: 'hotel' | 'tour' | 'bus' | 'cab',
    dto: {
      name: string;
      email: string;
      password: string;
      role?: string;
      phone?: string;
      permissions?: Record<string, boolean>;
    },
  ) {
    try {
      console.log('[DEBUG] Staff Creation Request:', {
        partnerId,
        type,
        email: dto.email,
        role: dto.role,
      });

      if (!partnerId) {
        console.error('[ERROR] PartnerId is missing in staff creation');
        throw new BadRequestException(
          'Partner ID is missing. Please re-login.',
        );
      }

      // Check if email already exists
      const existing = await this.staffRepository.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        console.warn('[WARN] Email already in use:', dto.email);
        throw new BadRequestException(
          'A staff member with this email already exists.',
        );
      }

      const passwordHash = await bcrypt.hash(dto.password, 10);

      // Normalize role
      let role = StaffRole.RECEPTIONIST;
      if (dto.role) {
        const upper = dto.role.toUpperCase();
        if (upper === 'STAFF') {
          role = StaffRole.RECEPTIONIST;
        } else if (Object.values(StaffRole).includes(upper as StaffRole)) {
          role = upper as StaffRole;
        }
      }

      const staffData: any = {
        name: dto.name,
        email: dto.email,
        passwordHash,
        phone: dto.phone,
        role,
        permissions: dto.permissions ?? {},
      };

      if (type === 'hotel') staffData.hotelId = partnerId;
      else if (type === 'tour') staffData.tourPartnerId = partnerId;
      else if (type === 'bus') staffData.busVendorId = partnerId;
      else if (type === 'cab') staffData.cabVendorId = partnerId;

      const staff = new Staff();
      Object.assign(staff, staffData);
      const saved = await this.staffRepository.save(staff);

      console.log('[SUCCESS] Staff member created:', saved.id);

      // Send invite email (simplified for now if hotelRepo is only for hotel)
      try {
        await this.mailService.sendStaffInvite(
          dto.email,
          dto.name,
          'Toliday Portal',
        );
      } catch (error) {
        console.error('Failed to send staff invite email:', error);
      }

      return this.sanitize(saved);
    } catch (err) {
      console.error('[CRITICAL] Staff Creation Failed:', err.message);
      throw err;
    }
  }

  async remove(id: string) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff member not found');
    if (staff.role === StaffRole.OWNER) {
      throw new BadRequestException('Cannot delete the hotel owner.');
    }
    await this.staffRepository.remove(staff);
    return { message: 'Staff member deleted successfully' };
  }

  async resetPassword(id: string, password: string) {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff member not found');

    const passwordHash = await bcrypt.hash(password, 10);
    await this.staffRepository.update(id, { passwordHash });
    return { message: 'Password reset successfully' };
  }

  async update(
    id: string,
    dto: Partial<{
      name: string;
      email: string;
      phone: string;
      role: string;
      isActive: boolean;
      permissions: Record<string, boolean>;
      twoFactorEnabled: boolean;
      emailNotifications: boolean;
      smsNotifications: boolean;
    }>,
  ) {
    // If role is provided, normalize it
    if (dto.role) {
      const upper = dto.role.toUpperCase();
      if (upper === 'STAFF') {
        dto.role = StaffRole.RECEPTIONIST;
      } else if (Object.values(StaffRole).includes(upper as StaffRole)) {
        dto.role = upper as any;
      }
    }
    await this.staffRepository.update(id, dto as any);
    return this.findOne(id);
  }

  async deactivate(id: string) {
    await this.staffRepository.update(id, { isActive: false });
    return { message: 'Staff member deactivated' };
  }

  private sanitize(s: Staff) {
    const { passwordHash: _, ...rest } = s;
    return rest;
  }
}
