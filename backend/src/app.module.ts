import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CampingSiteModule } from './camping_site/camping_site.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [UserModule, CampingSiteModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
