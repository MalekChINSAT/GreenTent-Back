import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { Public } from "../metadata";
import { User } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto"
import { SigninUserDTO } from '../user/dto/signin-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.signup(createUserDto);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() signInUserDto: SigninUserDTO) {
        return this.authService.login(signInUserDto);
    }

    
    @Public()
    @UseGuards(GoogleOAuthGuard)
    @Get('google')
    async googleAuth(@Request() req) { }

    @Get('google-redirect')
    @Public()
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
        return this.authService.googleLogin(req);
    }

}