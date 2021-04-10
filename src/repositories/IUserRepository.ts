import { User } from '../entities/User'

export interface IUserRepository {
  findByUsername(username: string): Promise<User>
  findByEmail(email: string): Promise<User>
  createUser(user: User): Promise<void>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  deleteUser(id: string): Promise<void>
}