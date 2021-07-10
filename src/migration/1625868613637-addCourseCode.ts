import {MigrationInterface, QueryRunner} from "typeorm";

export class addCourseCode1625868613637 implements MigrationInterface {
    name = 'addCourseCode1625868613637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_enrolled__courses" ("usersId" integer NOT NULL, "coursesId" integer NOT NULL, CONSTRAINT "PK_2fc1dfb24e859f34ef1b3966774" PRIMARY KEY ("usersId", "coursesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a3e6341723312710e5ea22193" ON "users_enrolled__courses" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2caabc3172b3d6bd78406f970" ON "users_enrolled__courses" ("coursesId") `);
        await queryRunner.query(`ALTER TABLE "Courses" ADD "code" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT 'false'`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "users_enrolled__courses" ADD CONSTRAINT "FK_1a3e6341723312710e5ea22193a" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_enrolled__courses" ADD CONSTRAINT "FK_d2caabc3172b3d6bd78406f970e" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_enrolled__courses" DROP CONSTRAINT "FK_d2caabc3172b3d6bd78406f970e"`);
        await queryRunner.query(`ALTER TABLE "users_enrolled__courses" DROP CONSTRAINT "FK_1a3e6341723312710e5ea22193a"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "isTeacher" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."isTeacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "emailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."emailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "code"`);
        await queryRunner.query(`DROP INDEX "IDX_d2caabc3172b3d6bd78406f970"`);
        await queryRunner.query(`DROP INDEX "IDX_1a3e6341723312710e5ea22193"`);
        await queryRunner.query(`DROP TABLE "users_enrolled__courses"`);
    }

}
