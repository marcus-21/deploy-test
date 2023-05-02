import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail(undefined, {
    message: "E-mail ou senha não válidos!"
    })
  email: string;

  @IsString({
    message: "E-mail ou senha não válidos!"
  })
  pass: string;
}
