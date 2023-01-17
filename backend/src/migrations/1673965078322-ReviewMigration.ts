import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ReviewMigration1673965078322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "review",
        }), true)

    }

  public async down(queryRunner: QueryRunner): Promise < void> {}

}
