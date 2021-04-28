import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSession1619605240117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '255',
            isPrimary: true
          },
          {
            name: 'json',
            type: 'text'
          },
          {
            name: 'expiredAt',
            type: 'bigint'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('session')
  }
}
