import { Review } from "src/review/entities/review.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Url } from "url";
import { Booking } from "../../booking/entities/booking.entity";

@Entity("campingSite")
export class CampingSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locationName: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  capacity: number;

  @Column("simple-array")
  activities: string[];

  @Column()
  address: string;

  @Column("simple-array")
  images: string[];

  //@Column()
  //linkToMaps: string;

  @OneToMany(() => Booking, (bookings: Booking) => bookings.campingSite, {
    eager: true,
  })
  bookings: Booking[];

  @OneToMany(() => Review, (reviews: Review) => reviews.campingSite, {
    eager: true,
  })
  reviews: Review[];
}
