import { DateGenerator } from '../../date-generator';
import { CampingSite } from 'src/camping_site/entities/camping_site.entity';
import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne , OneToMany, OneToOne} from 'typeorm';

@Entity('booking')
export class Booking extends DateGenerator {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingDate: Date ;
  @Column()
  startDate : Date ;
  @Column()
  endDate : Date ;
  @Column()
  cancelDate : Date ;

  @ManyToOne( () => User, (user: User) => user.bookings,  {eager:true} )
  user : User ;

  @ManyToOne( () => CampingSite, (campingSite: CampingSite) => campingSite.bookings )
  campingSite : CampingSite ;

  //@OneToOne( () => CampingSite, ( campingSite: CampingSite) => campingSite.bookings )
  //campingSite: CampingSite ;
}