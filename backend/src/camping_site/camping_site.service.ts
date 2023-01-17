import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Like, Repository } from 'typeorm';
import { CampingSite } from './entities/camping_site.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CampingSiteService extends CrudService<CampingSite> {
  constructor(
    @InjectRepository(CampingSite)
    private campingSiteRepository: Repository<CampingSite>,
  ) {
    super(campingSiteRepository);
  }

  async getFiveMostPopularCampsites(): Promise<CampingSite[]>{
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
      .select(["campingSite.id","campingSite.capacity"])
      .leftJoinAndSelect("campingSite.bookings", "booking")
      .where("booking.checkintDate NOT BETWEEN :startDate AND :endDate", { startDate, endDate })
      .andWhere("booking.checkoutDate NOT BETWEEN :startDate AND :endDate", { startDate, endDate })
      .andWhere("campingSite.capacity >= :guests", { guests })
      .groupBy("campingSite.id")
      .getMany();

    return availableCampsites;
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

  async getFiveBestCampsites(): Promise<CampingSite[]> {

    const getFiveBestCampsites = await this.campingSiteRepository
    .createQueryBuilder("campingSite")
    .leftJoinAndSelect("campingSite.reviews", "review")
    .addSelect("AVG(review.rating)", "averageRating")
    .groupBy("campingSite.id")
    .orderBy("averageRating", "DESC")
    .take(5)
    .getMany();
    return getFiveBestCampsites;
  }

}
