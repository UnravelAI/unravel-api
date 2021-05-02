import {MigrationInterface, QueryRunner} from "typeorm";

export class createDocumentsTable1619574133383 implements MigrationInterface {
    name = 'createDocumentsTable1619574133383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Documents" ("id" SERIAL NOT NULL, "fileName" character varying, "fileUrl" character varying, "fileUploaded" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "materialId" integer, CONSTRAINT "PK_c83f113e27e0b47ada7d9691125" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "Documents" ADD CONSTRAINT "FK_7491cec0fccfa3b5a2bec023b69" FOREIGN KEY ("materialId") REFERENCES "Materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Documents" DROP CONSTRAINT "FK_7491cec0fccfa3b5a2bec023b69"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`DROP TABLE "Documents"`);
    }

}
