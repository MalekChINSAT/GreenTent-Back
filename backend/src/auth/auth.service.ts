import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
       
        if (!user) throw new NotFoundException("email or password wrong");

        const passwordValid = await bcrypt.compare(pass, user.password);
        
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        };

        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(user: CreateUserDto):Promise<User> {

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

        const result = await this.usersService.create({...user, password: hashedPassword});

        return result;
    }

    googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }

        return {
            message: 'User information from google',
            user: req.user,
        };
    }
}