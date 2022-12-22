import { Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import  { LocalAuthGuard} from "./guards/local-auth.guard";
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import {Public} from "../metadata";
import { User} from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto"

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    @Public()
    @Public()
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
       return this.authService.signup(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('google')
    @Public()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req) {}

    @Get('google-redirect')
    @Public()
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
        return this.authService.googleLogin(req);
    }

}