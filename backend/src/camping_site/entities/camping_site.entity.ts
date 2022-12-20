import { PrimaryGeneratedColumn, Column,Entity,  OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('campingSite')
export class CampingSite {
    
@PrimaryGeneratedColumn()
  id: number;

@Column()
locationName : string ;
@Column()
description: string ;

@Column()
activities: string ;

@Column()
location : string ;

@Column()
linkToMaps: string ;

@OneToMany( () => Booking, (bookings: Booking) => bookings.campingSite,  {eager:true})
bookings: Booking[] ;







}
