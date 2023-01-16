import { CampingSite } from 'src/camping_site/entities/camping_site.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VoteEnum } from '../dto/voteEnum';
import { DateGenerator } from 'src/date-generator';

@Entity('review')
export class Review extends DateGenerator{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    comment: string;

    @Column({
        type: "enum",
        enum: VoteEnum,
    })
    
    vote: VoteEnum;

    @ManyToOne(()=> User, (user: User)=> user.reviews)
    user: User ;

    @ManyToOne(()=> CampingSite, (campingSite: CampingSite) => campingSite.reviews)
    campingSite: CampingSite; 
}