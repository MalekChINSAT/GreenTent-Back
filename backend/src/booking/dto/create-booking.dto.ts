import { Type } from 'class-transformer';
import { IsDate, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {

  @IsNumber()
  @ApiProperty({ type:'number', description: "the campSite id"})
  readonly campingSite: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  readonly checkintDate: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  readonly checkoutDate: Date;

  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({ type:'number'})
  readonly guests: number;
}
