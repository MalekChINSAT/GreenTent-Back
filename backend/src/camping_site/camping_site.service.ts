import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Brackets, Like, Repository } from 'typeorm';
import { CampingSite } from './entities/camping_site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampingSiteDto } from './dto/create-camping_site.dto';
import { Review } from '../review/entities/review.entity';
import { ReviewService } from '../review/review.service';
import { Booking } from 'src/booking/entities/booking.entity';

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
      .select(["campingSite.id", "campingSite.locationName", "campingSite.images"])
      .addSelect("COUNT(booking.id)", "bookings_count")
      .leftJoin('campingSite.bookings', 'booking')
      .groupBy('campingSite.id')
      .orderBy('bookings_count', 'DESC')
      .take(5)
      .getMany();

    return popularCampsites;
  }

  async getAvailableCampsites(startDate: string, endDate: string, guests: number): Promise<CampingSite[]> {
    const q = this.campingSiteRepository.createQueryBuilder("campingSite")
    const availableCampsites = await q
      .select(["campingSite.id", "campingSite.capacity"])
      .where(new Brackets(qb => {
        qb
          .where(q => {
            const subQuery = q.subQuery()
              .select("booking.campingSiteId")
              .from(Booking, "booking")
              .where("booking.checkintDate BETWEEN :startDate AND :endDate", { startDate, endDate })
              .andWhere("booking.checkoutDate BETWEEN :startDate AND :endDate", { startDate, endDate })
              .groupBy("booking.campingSiteId")
              .having("count(*) = 0")
              .getQuery();
            return "campingSite.id IN " + subQuery;
          })
          .orWhere(q => {
            const subQuery = q.subQuery()
              .select("booking.campingSiteId")
              .from(Booking, "booking")
              .getQuery();
            return "campingSite.id not IN " + subQuery;
          })
      }))
      .andWhere("campingSite.capacity >= :guests", { guests })
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

