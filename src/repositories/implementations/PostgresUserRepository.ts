import { getRepository } from 'typeorm'
import { User } from '../../entities/User'
import { IUpdateUserRequestDTO } from '../../useCases/User/UpdateUser/UpdateUserDTO'
import { IUpdateUserPasswordRequestDTO } from '../../useCases/Authentication/UpdateUserPassword/UpdateUserPasswordDTO'
import { IUserRepository } from '../IUserRepository'

export class PostgresUserRepository implements IUserRepository {
  private readonly allowedData: (keyof User)[] = ['id', 'username', 'email', 'created_at', 'updated_at']

  async findMany(): Promise<User[]> {
    const repository = getRepository(User)
    return repository.find({ select: this.allowedData })
  }

  async findById(id: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne(
      id,
      { select: this.allowedData }
    )
  }

  async findByIdWithPassword(id: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne(
      id
    )
  }

  async findByUsername(username: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne(
      { username },
      { select: this.allowedData }
    )
  }

  async findByEmail(email: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne(
      { email },
      { select: this.allowedData }
    )
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne(
      { email }
    )
  }

  async createUser(user: User): Promise<void> {
    const repository = getRepository(User)
    repository.save(user)
  }

  async updateUser(data: IUpdateUserRequestDTO): Promise<void> {
    const repository = getRepository(User)
    let user = await repository.findOne(data.id)

    user.email = data.email
    user.username = data.username
    user.updated_at = data.updated_at

    repository.save(user)
  }

  async updateUserPassword(data: IUpdateUserPasswordRequestDTO): Promise<void> {
    const repository = getRepository(User)
    const id = data.id
    let user = await repository.findOne(id)

    user.password = data.newPassword
    user.updated_at = data.updated_at

    repository.save(user)
  }

  async deleteUser(id: string): Promise<void> {
    const repository = getRepository(User)
    repository.delete(id)
  }
}