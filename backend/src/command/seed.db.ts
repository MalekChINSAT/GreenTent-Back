import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { CampingSiteService } from "../camping_site/camping_site.service";
import { UserService } from "../user/user.service";
import { BookingService } from "../booking/booking.service";
import { User } from "../user/entities/user.entity";
import { Booking } from "../booking/entities/booking.entity";
import { CampingSite } from "../camping_site/entities/camping_site.entity";
import { randFirstName, randEmail, randPassword, randFutureDate, randText, randCity } from '@ngneat/falso';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const campingSiteService = app.get(CampingSiteService);
    const bookingService = app.get(BookingService);
    const userService = app.get(UserService);

    
    for (let i = 0; i < 50; i++) {

        const booking = new Booking();
        const user = new User();
        const campingSite = new CampingSite() ;

        user.email= randEmail();
        user.username = randFirstName() ;
        user.password = randPassword() ;

        booking.bookingDate= randFutureDate() ;
        campingSite.description = randText() ;
        campingSite.location= randCity() ;
        
        await bookingService.create(booking);
        await userService.create(user);
        await campingSiteService.create(campingSite) ;

    }

    await app.close();
}

bootstrap();