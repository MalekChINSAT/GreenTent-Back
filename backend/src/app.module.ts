import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CampingSiteModule } from './camping_site/camping_site.module';
import { BookingModule } from './booking/booking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import {UserController} from "./user/user.controller";
import {AuthController} from "./auth/auth.controller";
import { typeOrmConfig } from './ormconfig';

dotenv.config();

@Module({
  imports: [
    UserModule,
    CampingSiteModule,
    ReviewModule,
    BookingModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController, AuthController, UserController, ReviewController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {}
