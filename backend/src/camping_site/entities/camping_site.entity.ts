import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';
import { Review } from "../../review/entities/review.entity";

@Entity('campingSite')
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

  @OneToMany(() => Booking, (booking: Booking) => booking.campingSite)
  bookings: Booking[];

  @OneToMany(() => Review, (reviews: Review) => reviews.campingSite, {
    eager: true,
  })
  reviews: Review[];
}
