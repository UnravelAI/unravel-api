import {MigrationInterface, QueryRunner} from "typeorm";

export class createCoursesTable1620096458835 implements MigrationInterface {
    name = 'createCoursesTable1620096458835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Courses" ("id" SERIAL NOT NULL, "name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e01ce00d3984a78d0693ab3ecbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Materials" ADD "courseId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "Materials" ADD CONSTRAINT "FK_51a3ec28f5077a963ed473df633" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Courses" ADD CONSTRAINT "FK_abaeb3b4770c1adf29a65c9a2bb" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT "FK_abaeb3b4770c1adf29a65c9a2bb"`);
        await queryRunner.query(`ALTER TABLE "Materials" DROP CONSTRAINT "FK_51a3ec28f5077a963ed473df633"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Materials" DROP COLUMN "courseId"`);
        await queryRunner.query(`DROP TABLE "Courses"`);
    }

}
