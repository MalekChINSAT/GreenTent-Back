import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto{

	@IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    birthdate: Date;

    @IsOptional()
    avatar: string;
}
