import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTextFieldToString1623298789824 implements MigrationInterface {
    name = 'ChangeTextFieldToString1623298789824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
    }

}
