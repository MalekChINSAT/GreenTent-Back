import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCampingSiteDto } from './create-camping_site.dto';

export class UpdateCampingSiteDto extends PartialType(CreateCampingSiteDto) {

}
