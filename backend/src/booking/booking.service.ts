import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService extends CrudService<Booking> {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>
  ){
    super(bookingRepository)
  }
}