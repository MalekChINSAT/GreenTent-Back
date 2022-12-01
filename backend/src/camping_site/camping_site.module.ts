import { Module } from '@nestjs/common';
import { CampingSiteService } from './camping_site.service';
import { CampingSiteController } from './camping_site.controller';

@Module({
  controllers: [CampingSiteController],
  providers: [CampingSiteService]
})
export class CampingSiteModule {}
