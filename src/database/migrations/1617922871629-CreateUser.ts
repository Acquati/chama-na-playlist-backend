import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUser1617922871629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true
          },
          {
            name: 'username',
            type: 'varchar',
            length: '100',
            isUnique: true
          },
          {
            name: 'email',
            type: 'varchar',
            length: '254',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'created_at',
            type: 'timestamp'
          },
          {
            name: 'updated_at',
            type: 'timestamp'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
