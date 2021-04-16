import { User } from '../entities/User'
import { IUpdateUserRequestDTO } from '../useCases/User/UpdateUser/UpdateUserDTO';
import { IUpdateUserPasswordRequestDTO } from '../useCases/User/UpdateUserPassword/UpdateUserPasswordDTO';

export interface IUserRepository {
  findMany(): Promise<User[]>
  findById(id: string): Promise<User>
  findByIdWithPassword(id: string): Promise<User>
  findByUsername(username: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findByEmailWithPassword(email: string): Promise<User>
  createUser(user: User): Promise<void>
  updateUser(data: IUpdateUserRequestDTO): Promise<void>
  updateUserPassword(data: IUpdateUserPasswordRequestDTO): Promise<void>
  deleteUser(id: string): Promise<void>
}