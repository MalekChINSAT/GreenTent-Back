import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class migration1673880719005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //to perform the migration
        await queryRunner.addColumn('booking', new TableColumn({
            name: 'createdAt',
            type: 'Date',
            isNullable: true,
        }));
        await queryRunner.addColumn('booking', new TableColumn({
            name: 'updatedAt',
            type: 'Date',
            isNullable: true,
        }));
        await queryRunner.addColumn('booking', new TableColumn({
            name: 'deletedAt',
            type: 'Date',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //to revert the last migration
    }

}
