import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}

