import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommentCountToExhibitsField1771851945361 implements MigrationInterface {
    name = 'AddCommentCountToExhibitsField1771851945361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibits" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibits" DROP COLUMN "commentCount"`);
    }

}
