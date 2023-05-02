import { 
    IsNotEmpty, 
    IsString,
} from "class-validator";

export class CreateSectorDto {

    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    tagName: string
}
