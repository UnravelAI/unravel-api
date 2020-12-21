import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1608510222149 implements MigrationInterface {
    name = 'createUserTable1608510222149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "email_verified" boolean NOT NULL DEFAULT 'false', "is_teacher" boolean NOT NULL DEFAULT 'false', "education_entity_name" character varying, "concentration" character varying, "gender" "Users_gender_enum" NOT NULL, "dob" character varying NOT NULL, "password_hash" character varying NOT NULL, "password_salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
