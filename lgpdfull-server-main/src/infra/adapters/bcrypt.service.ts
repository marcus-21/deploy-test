import { Injectable } from "@nestjs/common";
import { compare, hash } from 'bcrypt';
import { EncryptService } from "src/app/interfaces/encrypt-port.service";

@Injectable()
export class BcryptService implements EncryptService{

    public encryptPassword(password: string){
        return hash(password, 10);
    }

    public comparePasswords(pass: string, encryptedPass: string){
        return compare(pass, encryptedPass)
    }
}
