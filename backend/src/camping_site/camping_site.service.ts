import { forwardRef, Injectable , Inject} from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { CampingSite } from './entities/camping_site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampingSiteDto } from './dto/create-camping_site.dto';
import { Review } from 'src/review/entities/review.entity';
import { ReviewService } from 'src/review/review.service';

@Injectable()
export class CampingSiteService extends CrudService<CampingSite> {

  constructor(
    @InjectRepository(CampingSite)
    private campingSiteRepository: Repository<CampingSite>,
    /*@Inject(forwardRef(() => ReviewService))
    private reviewService: ReviewService,*/

  ) {
    super(campingSiteRepository);
  }

async addCampingSite(createCampingSiteDto: CreateCampingSiteDto): Promise<CampingSite>
{

  const {address, locationName, price  } = createCampingSiteDto;

      const campingSite = new CampingSite();
      campingSite.address = address;
      campingSite.locationName = locationName;
      campingSite.price = price;
  
      return await this.campingSiteRepository.save(campingSite);
}
/*async getCampsiteReviews(campsiteId: number): Promise<Review[]> {
  return await this.reviewService.findReviewsByCampingSite(campsiteId);
}*/
}

