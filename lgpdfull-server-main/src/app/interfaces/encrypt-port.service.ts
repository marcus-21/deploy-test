export abstract class EncryptService {
    abstract encryptPassword(pass: string): Promise<string>;
    abstract comparePasswords(pass: string, encryptedPass: string): Promise<boolean>;
}
