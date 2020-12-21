import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1608512103758 implements MigrationInterface {
    name = 'createUserTable1608512103758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT 'false', "isTeacher" boolean NOT NULL DEFAULT 'false', "educationEntityName" character varying, "concentration" character varying, "gender" "Users_gender_enum" NOT NULL, "dob" character varying NOT NULL, "passwordHash" character varying NOT NULL, "passwordSalt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
