import { Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, PrimaryColumn } from 'typeorm'

@Entity('user')
@Unique(['id', 'username', 'email'])
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}