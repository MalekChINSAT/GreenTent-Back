import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { isEmpty } from '../user.handler';
import { ApiProperty } from '@nestjs/swagger';


export class SigninUserDTO {

	@IsNotEmpty({
        message: isEmpty
    })
    @IsEmail()
    @ApiProperty({ type:'string'})
    email: string;

	@IsNotEmpty({
        message:  isEmpty
    })
    @IsString()
    @ApiProperty({ type:'string'})
    password: string;
}