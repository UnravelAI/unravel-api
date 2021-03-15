import {MigrationInterface, QueryRunner} from "typeorm";

export class createMaterialsTable1615841293854 implements MigrationInterface {
    name = 'createMaterialsTable1615841293854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Materials" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_c0280ff973b62e48040127631e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "Materials" ADD CONSTRAINT "FK_96a7852460475a10da7ee861262" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Materials" DROP CONSTRAINT "FK_96a7852460475a10da7ee861262"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`DROP TABLE "Materials"`);
    }

}
