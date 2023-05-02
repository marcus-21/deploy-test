import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { 
    IsNotEmpty, 
    IsString,
} from "class-validator";


export class UpdateUserPassDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    actualPass:string;

    @IsNotEmpty()
    @IsString()
    newPass:string
}
