import { User } from '../entities/User'

export interface IUserRepository {
  findByUsername(email: string): Promise<User>
  findByEmail(email: string): Promise<User>
  createUser(user: User): Promise<void>
  findAll(): Promise<User[]>
}