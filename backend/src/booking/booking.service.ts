import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CampingSiteService } from '../camping_site/camping_site.service';

@Injectable()
export class BookingService extends CrudService<Booking> {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private campingSiteService: CampingSiteService
  ) {
    super(bookingRepository)
  }

  async addBooking(createBookingDto: CreateBookingDto, user: any): Promise<Booking> {

    const { guests, checkintDate, checkoutDate, campingSite } = createBookingDto;

    const campsite = await this.campingSiteService.findOne(campingSite);

    if (!campingSite) {
      throw new NotFoundException()
    }

    const booking = new Booking();
    booking.checkoutDate = checkoutDate;
    booking.checkintDate = checkintDate;
    booking.guests = guests;
    booking.user = user.id;
    booking.campingSite = campsite;

    return await this.bookingRepository.save(booking);
  }

  async getBookingsById(userId: number): Promise<Booking[]> {
    console.log("userId", userId)
    return await this.bookingRepository
      .createQueryBuilder("booking")
      .leftJoinAndSelect("booking.campingSite", "campingSite")
      .where("booking.userId = :userId", { userId })
      .getMany();
  }

}