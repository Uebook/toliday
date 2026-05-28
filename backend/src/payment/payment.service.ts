import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private readonly workingKey = process.env.CCAVENUE_WORKING_KEY || 'MOCK_WORKING_KEY_FOR_DEV_ONLY_123';
  private readonly merchantId = process.env.CCAVENUE_MERCHANT_ID || 'MOCK_MERCHANT_ID';
  private readonly accessCode = process.env.CCAVENUE_ACCESS_CODE || 'MOCK_ACCESS_CODE';

  getMerchantId() {
    return this.merchantId;
  }

  getAccessCode() {
    return this.accessCode;
  }

  encrypt(plainText: string): string {
    const m = crypto.createHash('md5');
    m.update(this.workingKey);
    const key = m.digest();
    const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
  }

  decrypt(encText: string): string {
    try {
      const m = crypto.createHash('md5');
      m.update(this.workingKey);
      const key = m.digest();
      const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
      
      const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      let decoded = decipher.update(encText, 'hex', 'utf8');
      decoded += decipher.final('utf8');
      return decoded;
    } catch (e) {
      throw new BadRequestException('Failed to decrypt CCAvenue response');
    }
  }

  parseDecryptedString(decryptedStr: string): Record<string, string> {
    const params = decryptedStr.split('&');
    const result: Record<string, string> = {};
    for (const param of params) {
      const [key, value] = param.split('=');
      if (key && value) {
        result[key.trim()] = value.trim();
      }
    }
    return result;
  }
}
