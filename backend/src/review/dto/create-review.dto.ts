import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {

    @IsString()
    @IsOptional()
    @ApiProperty({ type:'string'})
    comment: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @ApiProperty({ type:'number'})
    vote: number;

    @IsNumber()
    @ApiProperty({ type:'number', description:"the id of the campsite to reviews"})
    campingSite: number;
}
