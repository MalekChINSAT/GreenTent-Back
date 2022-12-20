import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    TypeOrmModule.forFeature([Booking])
  ],
  exports: [BookingService],
})
export class BookingModule {}
