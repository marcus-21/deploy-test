import { Request, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../../app/use-cases/auth.service';
import { IsPublic } from '../../../../app/auth/decorators/is-public.decorator';
import { LocalAuthGuard } from '../../../../app/auth/guards/local-auth.guard';
import { AuthRequest } from '../../../../app/auth/models/AuthRequest';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest){
        return this.authService.login(req.user)
    }
}

