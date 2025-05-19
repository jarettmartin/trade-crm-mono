import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1747597888978 implements MigrationInterface {
    name = 'InitSchema1747597888978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "businesses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "streetNum" character varying NOT NULL, "streetName" character varying NOT NULL, "unit" character varying, "city" character varying NOT NULL, "stateProvince" character varying NOT NULL, "postalCode" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" uuid, "address_id" uuid, CONSTRAINT "PK_336bda7b0a0cd04241f719fc834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "businessId" uuid, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "scheduledAt" TIMESTAMP NOT NULL, "jobId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labour_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "hours" numeric(10,2) NOT NULL, "rate" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "jobId" uuid, CONSTRAINT "PK_bf2cbda585168815f31a7e821e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum" AS ENUM('pending', 'cancelled', 'in_progress', 'invoiced', 'paid')`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "status" "public"."jobs_status_enum" NOT NULL DEFAULT 'pending', "customerId" uuid, "businessId" uuid, "addressId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "material_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "unit_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "jobId" uuid, CONSTRAINT "PK_d832861fb4165c7fcc1df44a84c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_78725ac7117e7526e028014606b" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_addresses" ADD CONSTRAINT "FK_6be4e1a698f5c3f2c2e4c75c186" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_addresses" ADD CONSTRAINT "FK_a2d77da8e4c521383d48dcd3279" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_652f05fd67ef9354cb047aae572" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_495d83d45ca7a18488e4b425cf4" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labour_items" ADD CONSTRAINT "FK_833433406f6b172f3396941fdd0" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_15be39eec1b46b46690fd5460d0" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_c567a20039e7f72eb7fe00409dc" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_d498e24cc0c4ade2de16ee89571" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "material_items" ADD CONSTRAINT "FK_c7d6f9faa2f7fe29ffc2ffdfc39" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material_items" DROP CONSTRAINT "FK_c7d6f9faa2f7fe29ffc2ffdfc39"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_d498e24cc0c4ade2de16ee89571"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_c567a20039e7f72eb7fe00409dc"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_15be39eec1b46b46690fd5460d0"`);
        await queryRunner.query(`ALTER TABLE "labour_items" DROP CONSTRAINT "FK_833433406f6b172f3396941fdd0"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_495d83d45ca7a18488e4b425cf4"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_652f05fd67ef9354cb047aae572"`);
        await queryRunner.query(`ALTER TABLE "customer_addresses" DROP CONSTRAINT "FK_a2d77da8e4c521383d48dcd3279"`);
        await queryRunner.query(`ALTER TABLE "customer_addresses" DROP CONSTRAINT "FK_6be4e1a698f5c3f2c2e4c75c186"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_78725ac7117e7526e028014606b"`);
        await queryRunner.query(`DROP TABLE "material_items"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum"`);
        await queryRunner.query(`DROP TABLE "labour_items"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "customer_addresses"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "businesses"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
