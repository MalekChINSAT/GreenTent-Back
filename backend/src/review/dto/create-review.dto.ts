import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
export class CreateReviewDto {

    @IsString()
    @IsOptional()
    comment: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    vote: number;

}
