import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTextAnalysisTable1623298611220 implements MigrationInterface {
    name = 'CreateTextAnalysisTable1623298611220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TextAanalysis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" json, "sentimentsNegative" integer, "sentimentPositive" integer, "sentimentNeutral" integer, "entities" character varying, "pii" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "videoId" uuid, CONSTRAINT "REL_9568cad6063ea59d800560e444" UNIQUE ("videoId"), CONSTRAINT "PK_9b21dfb2e86fc87e05c5f9bb94f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD CONSTRAINT "FK_9568cad6063ea59d800560e4449" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP CONSTRAINT "FK_9568cad6063ea59d800560e4449"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`DROP TABLE "TextAanalysis"`);
    }

}
