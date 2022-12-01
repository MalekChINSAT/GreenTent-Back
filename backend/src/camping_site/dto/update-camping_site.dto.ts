import { PartialType } from '@nestjs/mapped-types';
import { CreateCampingSiteDto } from './create-camping_site.dto';

export class UpdateCampingSiteDto extends PartialType(CreateCampingSiteDto) {}
