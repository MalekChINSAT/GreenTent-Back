import { Module } from '@nestjs/common';
import { CampingSiteService } from './camping_site.service';
import { CampingSiteController } from './camping_site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampingSite } from './entities/camping_site.entity';

@Module({
  controllers: [CampingSiteController],
  providers: [CampingSiteService],
  imports: [
    TypeOrmModule.forFeature([CampingSite])
  ],
  exports: [CampingSiteService],
})
export class CampingSiteModule {}
