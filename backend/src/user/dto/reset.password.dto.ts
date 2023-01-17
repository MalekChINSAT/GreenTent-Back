import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ResetPasswordDto {

    @IsEmail()
	@IsNotEmpty()
	@ApiProperty({ type:'string'})
    email: string;

    @IsNotEmpty()
	@IsString()
	@ApiProperty({ type:'string'})
    password: string;

    @IsNotEmpty()
	@IsString()
	@ApiProperty({ type:'string'})
    passwordConfirmation: string;
}