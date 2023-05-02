import { Injectable } from "@nestjs/common";
import { createTransport } from 'nodemailer';
import { MailerService } from "src/app/interfaces/mailer-port.service";
import { ServiceError } from "../../app/common/errors/types/ServiceError";
import { emailRegisterTemplate } from "../utils/templates/mail/email-register-template.utils";
import { savePasswordEmailTemplate } from "../utils/templates/mail/save-pass-template.utils";

@Injectable()
export class NodeMailerService implements MailerService{

    public async sendPasswordEmail(email: string, password: string){

        const transport = createTransport({
            host: 'smtp.gmail.com',
            port:  465,
            secure: true,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transport.sendMail({
            from: "Solus LGPD <solusit2022@gmail.com",
            to: email,
            subject: 'Senha de acesso ao sistema LGPDFull',
            html: emailRegisterTemplate(password, email),
            text: `Nova senha: ${password}`
        })
        .catch((err) => {
            throw new ServiceError("O Serviço de e-mail está indisponível!")
        })
    }

    public async sendNewPasswordEmail(email: string, newPassword: string){

        const transport = createTransport({
        host: 'smtp.gmail.com',
        port:  465,
        secure: true,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
        });

        await transport.sendMail({
            from: "Solus LGPD <solusit2022@gmail.com",
            to: email,
            subject: 'Senha de acesso ao Sistema LGPDFull',
            html: savePasswordEmailTemplate(newPassword),
            text: `Nova senha: ${newPassword}`
        })
        .catch((err) => {
            throw new ServiceError("O Serviço de e-mail está indisponível!")
        })
    }

}
