import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { isEmpty, IsMax } from '../user.handler';

export class CreateUserDto {

    @IsNotEmpty({
        message: isEmpty
    })
    @IsEmail()
    email: string;

    @IsNotEmpty({
        message:  isEmpty
    })
    @IsString()
    @MaxLength(10,{
        message: IsMax(true)
    })
    username: string;

    @IsNotEmpty({
        message:  isEmpty
    })
    @IsString()
    password: string;
}

