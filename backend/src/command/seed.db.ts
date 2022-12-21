/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { CampingSiteService } from "../camping_site/camping_site.service";
import { UserService } from "../user/user.service";
import { BookingService } from "../booking/booking.service";
import { User } from "../user/entities/user.entity";
import { Booking } from "../booking/entities/booking.entity";
import { CampingSite } from "../camping_site/entities/camping_site.entity";
import { faker } from '@faker-js/faker';
import { randFullAddress, randFutureDate, randNumber, randPastDate, randRecentDate } from '@ngneat/falso';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const campingSiteService = app.get(CampingSiteService);
    const bookingService = app.get(BookingService);
    const userService = app.get(UserService);

    const bookings: Booking[] =[];
    const users: User[] =[];

    const createRandomUser = () => {
        const user = new User();
        user.username = faker.internet.userName();
        user.email = faker.internet.email();
        user.avatar = faker.image.avatar();
        user.password = faker.internet.password();
        user.birthdate = faker.date.birthdate();

        return user;
    }

    const createRandomCampingSite = () => {
        const campingSite = new CampingSite();

        campingSite.locationName= faker.address.streetName()
        campingSite.description = faker.lorem.lines(2) ;
        campingSite.address = randFullAddress();
        const array =[]
        for (let i=0; i<5; i++) {
            array.push(faker.image.nature(640, 480, true))
        }
        campingSite.images=array;
        campingSite.activities=['Fishing', 'Swimming', 'Diving', 'Hiking', 'Wildlife watching', 'Picnic in the Park']
        campingSite.price = faker.commerce.price(10, 400, 0);
        campingSite.capacity= faker.datatype.number({ max: 20, min:2})

        return campingSite;
    }

    const createRandomBooking = () => {
        const booking = new Booking();

        booking.cancelDate= randPastDate()
        booking.checkintDate= randRecentDate()
        booking.checkoutDate= randFutureDate()
        booking.guests= faker.datatype.number({min: 1, max: 10});

        return booking;
    }

    for (let i = 0; i < 50; i++) {
        //50 users
        const user =createRandomUser();
        users[i]=user;
    }

    for (let i = 0; i < 50; i++) {
        //100 bookings
        const booking1 = createRandomBooking();
        const booking2 = createRandomBooking();

        //tostart with: each user has 2 booking
        users[i].bookings=[booking1, booking2]

        //one booking one user
        booking1.user= users[i]
        //one booking one user
        booking2.user= users[i]
        bookings.push(booking1, booking2);

        await userService.create(users[i]);
    }

    for(let j=0; j<50; j+=2){
        //25 camping site => 50 bookings
        const camping_site = createRandomCampingSite();

        //example: each camping_site has 2 bookings
        camping_site.bookings= bookings.slice(j, j+2);

        bookings[j].campingSite=camping_site;
        bookings[j+1].campingSite=camping_site

        await campingSiteService.create(camping_site);
        await bookingService.create(bookings[j]);
        await bookingService.create(bookings[j+1]);
    }
    await app.close();
}

bootstrap();