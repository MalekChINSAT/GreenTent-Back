import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CampingSiteService } from 'src/camping_site/camping_site.service';

@Injectable()
export class BookingService extends CrudService<Booking> {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private campingSiteService: CampingSiteService
  ){
    super(bookingRepository)
  }

  async addBooking(createBookingDto: CreateBookingDto, user: any): Promise<Booking>{

    const { guests, checkintDate, checkoutDate, campingSite } = createBookingDto;
        const booking = new Booking();
        booking.checkoutDate = checkoutDate;
        booking.checkintDate = checkintDate;
        booking.guests = guests;
        booking.user=user.id;
        booking.campingSite = await this.campingSiteService.findOne(campingSite);
        return await this.bookingRepository.save(booking);
  }
}