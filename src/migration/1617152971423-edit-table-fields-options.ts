import {MigrationInterface, QueryRunner} from "typeorm";

export class editTableFieldsOptions1617152971423 implements MigrationInterface {
    name = 'editTableFieldsOptions1617152971423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "filename"`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "fileName" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."duration" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "streamingUrl" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."streamingUrl" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."jobCompleted" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "jobCompleted" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."views" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "views" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "transcription" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."transcription" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."transcription" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "transcription" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "views" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."views" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "jobCompleted" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."jobCompleted" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."streamingUrl" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "streamingUrl" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Videos"."duration" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "duration" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "fileName"`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "filename" character varying NOT NULL`);
    }

}
