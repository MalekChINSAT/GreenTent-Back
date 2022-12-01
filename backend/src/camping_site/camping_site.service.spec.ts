import { Test, TestingModule } from '@nestjs/testing';
import { CampingSiteService } from './camping_site.service';

describe('CampingSiteService', () => {
  let service: CampingSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampingSiteService],
    }).compile();

    service = module.get<CampingSiteService>(CampingSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
