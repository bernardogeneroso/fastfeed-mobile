import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createDeliveries1615998869082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "deliveries",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "product",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "postal_code",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "deliveryman_id",
            type: "uuid",
          },
          {
            name: "canceled_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "signature_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "start_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "deliveries",
      new TableForeignKey({
        name: "UsersDeliveries",
        columnNames: ["deliveryman_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("deliveries");
  }
}
