import { User } from '../entities/User'
import { IUpdateUserRequestDTO } from '../useCases/User/UpdateUser/UpdateUserDTO';
import { IUpdateUserPasswordRequestDTO } from '../useCases/User/UpdateUserPassword/UpdateUserPasswordDTO';

export interface IUserRepository {
  findByUsername(username: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findByEmailGetPassword(email: string): Promise<User>
  createUser(user: User): Promise<void>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  deleteUser(id: string): Promise<void>
  updateUser(data: IUpdateUserRequestDTO): Promise<void>
  updateUserPassword(data: IUpdateUserPasswordRequestDTO): Promise<void>
}