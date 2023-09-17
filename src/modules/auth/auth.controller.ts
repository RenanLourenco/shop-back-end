import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './DTO/RegisterUser.dto';
import { LoginUserDTO } from './DTO/LoginUser.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/AuthRequest.interface';
import { IsPublic } from 'src/common/decorators/isPublic.decorator';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @IsPublic()
    @Post("/register")
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async register(@Body() data: RegisterUserDTO){
        try {
            const user = await this.authService.registerUser(data)
            return {
                msg:'User registered.',
                user,
            }
        } catch (error) {
            return error.message;
        }
    }


    @IsPublic()
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() request: AuthRequest) {
        return this.authService.login(request.user);
    }
}
