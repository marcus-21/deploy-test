import { Injectable } from '@nestjs/common';
import { UserPayload } from '../auth/models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../auth/models/UserToken';
import { UserEntity } from 'src/app/entities/user.entity';
import { UnauthorizedError } from '../common/errors/types/UnauthorizedError';
import { UserRepository } from '../interfaces/repositories/user-port.repository';
import { EncryptService } from '../interfaces/encrypt-port.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly repository: UserRepository,
        private readonly encryptService: EncryptService
    ){}

    login(user: UserEntity): UserToken {
        const payload: UserPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            companyName: user.companyName
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            acessToken: jwtToken,
            id: payload.id,
            name: payload.name,
            companyName: payload.companyName
        }
    }

    async validateUser(email: string, pass: string) {
        const user = await this.repository.findByEmail(email);

        if(user){
            const isPassValid = await this.encryptService.comparePasswords(pass, user.pass);

            if(isPassValid){
                user.pass = undefined;
                return {
                    ...user,
                }
            }
        }

        throw new UnauthorizedError('Email ou senha estão incorretos.');
    }
}
