import { Controller, Get } from '@nestjs/common';
import { IsPublic } from 'src/app/auth/decorators/is-public.decorator';

@Controller()
export class AppController {

  @IsPublic()
  @Get()
  getHello(){
    return 'Hello';
  }
}