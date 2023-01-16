import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-review.dto';


@Injectable()
export class ReviewService extends CrudService<Review> {

constructor(
@InjectRepository(Review)
private reviewRepository: Repository<Review>,
) {
super(reviewRepository);
}
async addReview(createReviewDto: CreateReviewDto, user : any ): Promise<Review>
{
const { vote , comment } = createReviewDto;
const review = new Review();
review.comment= comment ;
review.vote= vote ;
review.user= user.id;


return await this.reviewRepository.save(review);
}
}



