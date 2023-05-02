import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/app/use-cases/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'email',
      passwordField: 'pass',
    }); 
  }

  async validate(email: string, pass: string) {
    return await this.authService.validateUser(email, pass);
  }
}