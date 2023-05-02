import { Module } from "@nestjs/common";
import { EncryptService } from "src/app/interfaces/encrypt-port.service";
import { GeneratePassService } from "src/app/interfaces/generate-pass-port.service";
import { MailerService } from "src/app/interfaces/mailer-port.service";
import { BcryptService } from "./bcrypt.service";
import { GeneratePasswordService } from "./generate-password.service";
import { NodeMailerService } from "./nodemailer.service";

@Module({
    providers:[
        {
            provide: EncryptService,
            useClass: BcryptService
        },
        {
            provide: GeneratePassService,
            useClass: GeneratePasswordService
        },
        {
            provide: MailerService,
            useClass: NodeMailerService
        },
    ],
    exports: [
        EncryptService,
        GeneratePassService,
        MailerService
    ]
  })
export class AdaptersModule {}
