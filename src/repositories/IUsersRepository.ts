import { User } from '../entities/User'

export interface IUsersRepository {
  findByUsername(email: string): Promise<User>
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
  find(): Promise<User[]>
}