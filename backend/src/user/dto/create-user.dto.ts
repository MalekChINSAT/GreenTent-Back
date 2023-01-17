import {IsEmail, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { isEmpty, IsMax } from '../user.handler';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

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
    @MaxLength(10,{
        message: IsMax(true)
    })
    @ApiProperty({ type:'string'})
    username: string;

    @IsNotEmpty({
        message:  isEmpty
    })
    @IsString()
    @ApiProperty({ type:'string'})
    password: string;
}

