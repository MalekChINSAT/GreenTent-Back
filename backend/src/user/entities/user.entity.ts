//import { DateGenerator } from 'src/date-generator';
import { Booking } from '../../booking/entities/booking.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  birthdate: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => Booking, (booking: Booking) => booking.user)
  bookings: Booking[];
}
