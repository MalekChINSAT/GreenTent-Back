import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { CampingSite } from './entities/camping_site.entity';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CampingSiteService extends CrudService<CampingSite> {
  constructor(
    @InjectRepository(CampingSite)
    private campingSiteRepository: Repository<CampingSite>
  ){
    super(campingSiteRepository)
  }
}