//import { DateGenerator } from 'src/date-generator';
import { CampingSite } from '../../camping_site/entities/camping_site.entity';
import { User } from '../../user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkintDate: Date;

  @Column()
  checkoutDate: Date;

  @Column()
  cancelDate: Date;

  @Column()
  guests: number;

  @ManyToOne(() => User, (user: User) => user.bookings, { eager: true })
  user: User;

  @ManyToOne(
    () => CampingSite,
    (campingSite: CampingSite) => campingSite.bookings,
  )
  campingSite: CampingSite;
}
