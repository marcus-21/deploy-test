import { PartialType } from '@nestjs/mapped-types';
import { CreateDpoDto } from './create-dpo.dto';
import {
    IsNotEmpty,
    IsEmail,
    IsString,
} from "class-validator";

        


export class UpdateDpoDto extends PartialType(CreateDpoDto) {}
