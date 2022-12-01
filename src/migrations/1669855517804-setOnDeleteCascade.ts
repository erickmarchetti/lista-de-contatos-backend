import { MigrationInterface, QueryRunner } from "typeorm";

export class setOnDeleteCascade1669855517804 implements MigrationInterface {
    name = 'setOnDeleteCascade1669855517804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_numbers" DROP CONSTRAINT "FK_c4a5c18fd1ee518b87cf96a03d7"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "user_numbers" DROP CONSTRAINT "FK_ac87aa8504dfe02721077059e45"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "contact_emails" DROP CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf"`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" ALTER COLUMN "contactId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ALTER COLUMN "contactId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" ADD CONSTRAINT "FK_c4a5c18fd1ee518b87cf96a03d7" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_numbers" ADD CONSTRAINT "FK_ac87aa8504dfe02721077059e45" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ADD CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_emails" DROP CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "user_numbers" DROP CONSTRAINT "FK_ac87aa8504dfe02721077059e45"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" DROP CONSTRAINT "FK_c4a5c18fd1ee518b87cf96a03d7"`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ALTER COLUMN "contactId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" ALTER COLUMN "contactId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ADD CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_numbers" ADD CONSTRAINT "FK_ac87aa8504dfe02721077059e45" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_numbers" ADD CONSTRAINT "FK_c4a5c18fd1ee518b87cf96a03d7" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
