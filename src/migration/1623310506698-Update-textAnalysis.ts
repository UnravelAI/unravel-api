import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTextAnalysis1623310506698 implements MigrationInterface {
    name = 'UpdateTextAnalysis1623310506698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentsNegative"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentsNegative" numeric`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentPositive"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentPositive" numeric`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentNeutral"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentNeutral" numeric`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentMixed"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentMixed" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentMixed"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentMixed" integer`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentNeutral"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentNeutral" integer`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentPositive"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentPositive" integer`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" DROP COLUMN "sentimentsNegative"`);
        await queryRunner.query(`ALTER TABLE "TextAanalysis" ADD "sentimentsNegative" integer`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
    }

}
