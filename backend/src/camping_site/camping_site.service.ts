import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Like, Repository } from 'typeorm';
import { CampingSite } from './entities/camping_site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampingSiteDto } from './dto/create-camping_site.dto';
import { Review } from '../review/entities/review.entity';
import { ReviewService } from '../review/review.service';

@Injectable()
export class CampingSiteService extends CrudService<CampingSite> {

  constructor(
    @Inject(forwardRef(() => ReviewService))
    private reviewService: ReviewService,
    @InjectRepository(CampingSite)
    private campingSiteRepository: Repository<CampingSite>,
  ) {
    super(campingSiteRepository);
  }

  async getFiveMostPopularCampsites(): Promise<CampingSite[]> {
    const popularCampsites = await this.campingSiteRepository
      .createQueryBuilder('campingSite')
      .select(["campingSite.id"])
      .addSelect("COUNT(booking.id)", "bookings_count")
      .leftJoin('campingSite.bookings', 'booking')
      .groupBy('campingSite.id')
      .orderBy('bookings_count', 'DESC')
      .take(5)
      .getMany();

    return popularCampsites;
  }

  async getAvailableCampsites(startDate: string, endDate: string, guests: number): Promise<CampingSite[]> {
    const availableCampsites = await this.campingSiteRepository
      .createQueryBuilder("campingSite")
      .select(["campingSite.id", "campingSite.capacity"])
      .leftJoinAndSelect("campingSite.bookings", "booking")
      .where("booking.checkintDate NOT BETWEEN :startDate AND :endDate", { startDate, endDate })
      .andWhere("booking.checkoutDate NOT BETWEEN :startDate AND :endDate", { startDate, endDate })
      .andWhere("campingSite.capacity >= :guests", { guests })
      .groupBy("campingSite.id")
      .getMany();

    return availableCampsites;
  }

  async getFiveBestCampsites(): Promise<CampingSite[]> {

    const getFiveBestCampsites = await this.campingSiteRepository
      .createQueryBuilder("campingSite")
      .select(["campingSite.id", "campingSite.locationName"])
      .leftJoin("campingSite.reviews", "review")
      .addSelect("AVG(review.vote)", "averageRating")
      .groupBy("campingSite.id")
      .orderBy("averageRating", "DESC")
      .take(5)
      .getMany();
      
    return getFiveBestCampsites;
  }


  async getCampsites(skip: number, limit: number): Promise<CampingSite[]> {
    return await this.campingSiteRepository.find({
      skip,
      take: limit
    });
  }

  async searchCampsite(searchString: string): Promise<CampingSite[]> {
    return await this.campingSiteRepository.find({
      where: [
        { locationName: Like(`%${searchString}%`) },
        { description: Like(`%${searchString}%`) },
      ]
    });
  }

  async addCampingSite(createCampingSiteDto: CreateCampingSiteDto): Promise<CampingSite> {

    const { address, locationName, price } = createCampingSiteDto;

    const campingSite = new CampingSite();
    campingSite.address = address;
    campingSite.locationName = locationName;
    campingSite.price = price;

    return await this.campingSiteRepository.save(campingSite);
  }

  async getReviewsById(campsiteId: number): Promise<Review[]> {
    return await this.reviewService.findReviewsByCampingSite(campsiteId);
  }

}

