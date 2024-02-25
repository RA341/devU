import { MigrationInterface, QueryRunner } from 'typeorm'

export class addDeadlineExtensions1708833952012 implements MigrationInterface {
  name = 'addDeadlineExtensions1708833952012'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "deadline_extensions"
                             (
                                 "id"            SERIAL    NOT NULL,
                                 "assignment_id" integer   NOT NULL,
                                 "creator_id"    integer   NOT NULL,
                                 "user_id"       integer   NOT NULL,
                                 "deadline_date" TIMESTAMP NOT NULL,
                                 "created_at"    TIMESTAMP NOT NULL DEFAULT now(),
                                 "updated_at"    TIMESTAMP NOT NULL DEFAULT now(),
                                 "deleted_at"    TIMESTAMP,
                                 CONSTRAINT "PK_7f77bdaaa612f494d52177c7b59" PRIMARY KEY ("id")
                             )`)
    await queryRunner.query(`ALTER TABLE "deadline_extensions"
        ADD CONSTRAINT "FK_733bb5fb011e3d6d59823765422" FOREIGN KEY ("assignment_id") REFERENCES "assignments" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "deadline_extensions"
        ADD CONSTRAINT "FK_7cb47489122a342a16a29a5340a" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "deadline_extensions"
        ADD CONSTRAINT "FK_d5b5ea708f3fa09453f327dcbfc" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "deadline_extensions" DROP CONSTRAINT "FK_d5b5ea708f3fa09453f327dcbfc"`)
    await queryRunner.query(`ALTER TABLE "deadline_extensions" DROP CONSTRAINT "FK_7cb47489122a342a16a29a5340a"`)
    await queryRunner.query(`ALTER TABLE "deadline_extensions" DROP CONSTRAINT "FK_733bb5fb011e3d6d59823765422"`)
    await queryRunner.query(`DROP TABLE "deadline_extensions"`)
  }

}
