import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from 'src/booking/entities/booking.entity';
import { BookingService } from 'src/booking/booking.service';
import { ResetPasswordDto } from './dto/reset.password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bookingService: BookingService
  ) {
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

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email, password, passwordConfirmation } = resetPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Password and confirmPassword do not match.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    throw new HttpException("Password is updated succesffully", HttpStatus.OK)
  }
}
