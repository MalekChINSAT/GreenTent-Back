import { DateGenerator } from '../../date-generator';
import {Booking} from '../../booking/entities/booking.entity'
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends DateGenerator {
    
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;

  @Column()
  birthdate: Date ;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Booking, ( booking: Booking) => booking.user)
  bookings: Booking[]

}
