import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendStaffInvite(email: string, name: string, hotelName: string) {
    // Placeholder for actual mail sending logic (e.g. using Nodemailer or AWS SES)
    this.logger.log(
      `[MAIL] Sending staff invite to ${email} (Name: ${name}) for hotel ${hotelName}`,
    );

    // In a real scenario, you'd send a link like:
    // https://portal.tolidaytrip.com/set-password?token=...
  }
}
