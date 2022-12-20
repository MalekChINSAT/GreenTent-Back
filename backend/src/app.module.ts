import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CampingSiteModule } from './camping_site/camping_site.module';
import { BookingModule } from './booking/booking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv'

dotenv.config() ;

@Module({
  imports: [UserModule, CampingSiteModule, BookingModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD ,
    database: process.env.DB_NAME,
    autoLoadEntities:true,
    logging:true,
    synchronize: true,
    entities: [] ,
  }),
  ConfigModule.forRoot(
    {isGlobal: true} 
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
