import { Type } from 'class-transformer';
import { IsString, IsDate, IsNumber, Min, Max } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  readonly campingSite: number;

  @IsDate()
  @Type(() => Date)
  readonly checkintDate: Date;

  @IsDate()
  @Type(() => Date)
  readonly checkoutDate: Date;

  @IsNumber()
  @Min(1)
  @Max(10)
  readonly guests: number;
}
