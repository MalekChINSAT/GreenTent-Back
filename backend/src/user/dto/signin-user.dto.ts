import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { isEmpty } from '../user.handler';

export class SigninUserDTO {

	@IsNotEmpty({
        message: isEmpty
    })
    @IsEmail()
    email: string;

	@IsNotEmpty({
        message:  isEmpty
    })
    @IsString()
    password: string;
}