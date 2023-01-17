import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ResetPasswordDto {

    @IsEmail()
	@IsNotEmpty()
    email: string;

    @IsNotEmpty()
	@IsString()
    password: string;

    @IsNotEmpty()
	@IsString()
    passwordConfirmation: string;
}