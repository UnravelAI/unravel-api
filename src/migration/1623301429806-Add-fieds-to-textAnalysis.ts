import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFiedsToTextAnalysis1623301429806 implements MigrationInterface {
    name = 'AddFiedsToTextAnalysis1623301429806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentMixed" integer`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentiment" character varying`);
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
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentiment"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentMixed"`);
    }

}
