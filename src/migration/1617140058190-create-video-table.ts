import {MigrationInterface, QueryRunner} from "typeorm";

export class createVideoTable1617140058190 implements MigrationInterface {
    name = 'createVideoTable1617140058190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "duration" character varying NOT NULL, "streamingUrl" character varying NOT NULL, "jobCompleted" boolean NOT NULL, "views" integer NOT NULL, "transcription" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cafd1e310bdf514e0d6a94df1a" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "Videos"`);
    }

}
