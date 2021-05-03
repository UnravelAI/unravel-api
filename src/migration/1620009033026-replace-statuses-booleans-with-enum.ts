import {MigrationInterface, QueryRunner} from "typeorm";

export class replaceStatusesBooleansWithEnum1620009033026 implements MigrationInterface {
    name = 'replaceStatusesBooleansWithEnum1620009033026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "jobCompleted"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "transcriptionCompleted"`);
        await queryRunner.query(`CREATE TYPE "Videos_status_enum" AS ENUM('processing', 'editable', 'editing', 'published')`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "status" "Videos_status_enum" NOT NULL DEFAULT 'processing'`);
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
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "Videos_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "transcriptionCompleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "jobCompleted" boolean NOT NULL DEFAULT false`);
    }

}
