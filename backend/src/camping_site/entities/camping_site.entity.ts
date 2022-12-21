import { User } from 'src/user/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Url } from 'url';
import { Booking } from '../../booking/entities/booking.entity';

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

  @Column('simple-array')
  activities: string[];

  @Column()
  address: string;

  @Column('simple-array')
  images: string[];

  //@Column()
  //linkToMaps: string;

  @OneToMany(() => Booking, (bookings: Booking) => bookings.campingSite, {
    eager: true,
  })
  bookings: Booking[];
}
