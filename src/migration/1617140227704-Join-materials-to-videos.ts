import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinMaterialsToVideos1617140227704 implements MigrationInterface {
    name = 'JoinMaterialsToVideos1617140227704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Materials" ADD "videoId" uuid`);
        await queryRunner.query(`ALTER TABLE "Materials" ADD CONSTRAINT "UQ_c61e14a791c9103f611fd757fcb" UNIQUE ("videoId")`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "Materials" ADD CONSTRAINT "FK_c61e14a791c9103f611fd757fcb" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Materials" DROP CONSTRAINT "FK_c61e14a791c9103f611fd757fcb"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Materials" DROP CONSTRAINT "UQ_c61e14a791c9103f611fd757fcb"`);
        await queryRunner.query(`ALTER TABLE "Materials" DROP COLUMN "videoId"`);
    }

}
