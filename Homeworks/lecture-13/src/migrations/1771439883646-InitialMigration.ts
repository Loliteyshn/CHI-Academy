import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1771439883646 implements MigrationInterface {
    name = 'InitialMigration1771439883646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
