import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import { BookingModule } from 'src/booking/booking.module';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    BookingModule
  ],
  exports: [UserService],

}) 
export class UserModule {}
