import {MigrationInterface, QueryRunner} from "typeorm";

export class addTranscriptionJobFields1618802442537 implements MigrationInterface {
    name = 'addTranscriptionJobFields1618802442537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Videos" ADD "transcriptionUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "transcriptionCompleted" boolean NOT NULL DEFAULT false`);
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
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "transcriptionCompleted"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "transcriptionUrl"`);
    }

}
