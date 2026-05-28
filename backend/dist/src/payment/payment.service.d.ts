export declare class PaymentService {
    private readonly workingKey;
    private readonly merchantId;
    private readonly accessCode;
    getMerchantId(): string;
    getAccessCode(): string;
    encrypt(plainText: string): string;
    decrypt(encText: string): string;
    parseDecryptedString(decryptedStr: string): Record<string, string>;
}
