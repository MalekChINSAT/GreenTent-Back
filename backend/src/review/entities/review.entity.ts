import { CampingSite } from 'src/camping_site/entities/camping_site.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateGenerator } from 'src/date-generator';
import { Max, Min } from 'class-validator';

@Entity('review')
export class Review extends DateGenerator{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    comment: string;

    @Column()
    @Min(1)
    @Max(5)
    vote: number;

    @ManyToOne(()=> User, (user: User)=> user.reviews)
    user: User ;

    @ManyToOne(()=> CampingSite, (campingSite: CampingSite) => campingSite.reviews)
    campingSite: CampingSite; 
}