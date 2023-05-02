export abstract class MailerService{
    abstract sendPasswordEmail(email: string, password: string): Promise<void>;
    abstract sendNewPasswordEmail(email: string, newPassword: string): Promise<void>;
}