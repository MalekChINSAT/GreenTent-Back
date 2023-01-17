import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampingSiteModule } from '../camping_site/camping_site.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    TypeOrmModule.forFeature([Booking]),
    CampingSiteModule
  ],
  exports: [BookingService],
})
export class BookingModule {}
