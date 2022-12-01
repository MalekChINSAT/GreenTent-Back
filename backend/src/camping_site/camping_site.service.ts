import { Injectable } from '@nestjs/common';
import { CreateCampingSiteDto } from './dto/create-camping_site.dto';
import { UpdateCampingSiteDto } from './dto/update-camping_site.dto';

@Injectable()
export class CampingSiteService {
  create(createCampingSiteDto: CreateCampingSiteDto) {
    return 'This action adds a new campingSite';
  }

  findAll() {
    return `This action returns all campingSite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campingSite`;
  }

  update(id: number, updateCampingSiteDto: UpdateCampingSiteDto) {
    return `This action updates a #${id} campingSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} campingSite`;
  }
}
