import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class PostgresUsersRepository implements IUsersRepository {
  private users: User[] = []

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find(user => user.username === username)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)

    return user
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async find(): Promise<User[]> {
    return this.users
  }
}