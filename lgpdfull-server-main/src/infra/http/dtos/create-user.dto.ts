import {
    IsNotEmpty,
    IsEmail,
    IsString
} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    socialName: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    companyName:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail(undefined, {
        message: "Este e-mail não é válido!"
    })
    email:string;
}
