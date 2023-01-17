import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from 'src/booking/entities/booking.entity';
import { BookingService } from 'src/booking/booking.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bookingService: BookingService
  ){
    super(userRepository)
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async getBookingsById(id: number): Promise<Booking[]> {
    return await this.bookingService.getBookingsById(+id)
  }
}
