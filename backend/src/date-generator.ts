import { UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

export class DateGenerator {

    @CreateDateColumn({ update: false})
    createdAt: Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn()
    deletedAt : Date
}