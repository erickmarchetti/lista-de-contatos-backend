import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllTables1669833490821 implements MigrationInterface {
    name = 'createAllTables1669833490821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_numbers" ("id" SERIAL NOT NULL, "number" character varying(13) NOT NULL, "contactId" integer, CONSTRAINT "PK_f5733cf0d0034ad0b57fb822bb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_emails" ("id" SERIAL NOT NULL, "email" character varying(40) NOT NULL, "userId" integer, CONSTRAINT "PK_3ef6c4be97ba94ea3ba65362ad0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_numbers" ("id" SERIAL NOT NULL, "number" character varying(13) NOT NULL, "userId" integer, CONSTRAINT "PK_1646e309d15fbcb76434385ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying(50) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9" UNIQUE ("full_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "full_name" character varying(50) NOT NULL, "userId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_emails" ("id" SERIAL NOT NULL, "email" character varying(40) NOT NULL, "contactId" integer, CONSTRAINT "PK_fe57f999770a7da0338a9b29db3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" ADD CONSTRAINT "FK_c4a5c18fd1ee518b87cf96a03d7" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_numbers" ADD CONSTRAINT "FK_ac87aa8504dfe02721077059e45" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ADD CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_emails" DROP CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "user_numbers" DROP CONSTRAINT "FK_ac87aa8504dfe02721077059e45"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" DROP CONSTRAINT "FK_c4a5c18fd1ee518b87cf96a03d7"`);
        await queryRunner.query(`DROP TABLE "contact_emails"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_numbers"`);
        await queryRunner.query(`DROP TABLE "user_emails"`);
        await queryRunner.query(`DROP TABLE "contact_numbers"`);
    }

}
