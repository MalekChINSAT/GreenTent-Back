import { forwardRef, Injectable, Inject} from "@nestjs/common";
import { CrudService } from "src/common/crud.service";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { CampingSiteService } from "src/camping_site/camping_site.service";


@Injectable()
export class ReviewService extends CrudService<Review> {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    /*@Inject(forwardRef(() => CampingSiteService))*/
    private campingSiteService: CampingSiteService
  ) {
    super(reviewRepository);
  }
  async addReview(
    createReviewDto: CreateReviewDto,
    user: any
  ): Promise<Review> {
    const { vote, comment, campingSite } = createReviewDto;
    const review = new Review();
    review.comment = comment;
    review.vote = vote;
    review.user = user.id;
    review.campingSite = await this.campingSiteService.findOne(campingSite);

    return await this.reviewRepository.save(review);
  }

  /*async findReviewsByCampingSite(campingSiteId): Promise<Review[]> {
    return await this.reviewRepository.find({where: {campingSite: campingSiteId }});
}*/
}
