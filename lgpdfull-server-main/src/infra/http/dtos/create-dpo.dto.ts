import {
    IsNotEmpty,
    IsEmail,
    IsString,
    IsBoolean,
} from "class-validator";

export class CreateDpoDto {

    @IsNotEmpty()
    @IsString()
    userId:string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    socialName: string;

    @IsNotEmpty()
    @IsBoolean()
    naturalPerson: boolean;

    @IsNotEmpty()
    @IsString()
    @IsEmail(undefined, {
        message: "Este e-mail não é válido!"
    })
    email: string;
}
