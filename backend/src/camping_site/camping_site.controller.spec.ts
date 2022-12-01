import { Test, TestingModule } from '@nestjs/testing';
import { CampingSiteController } from './camping_site.controller';
import { CampingSiteService } from './camping_site.service';

describe('CampingSiteController', () => {
  let controller: CampingSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampingSiteController],
      providers: [CampingSiteService],
    }).compile();

    controller = module.get<CampingSiteController>(CampingSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
