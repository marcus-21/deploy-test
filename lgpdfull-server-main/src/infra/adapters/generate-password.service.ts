import { Injectable } from "@nestjs/common";
import { generate } from 'generate-password';

@Injectable()
export class GeneratePasswordService{

    public generate(): string{
        const password = generate({
            length: 8,
            numbers: true,
            symbols: false,
            strict: true
        });

        return password;
    }
}
