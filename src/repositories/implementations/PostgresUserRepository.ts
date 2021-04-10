import { getRepository } from 'typeorm'
import { User } from '../../entities/User'
import { IUpdateUserRequestDTO } from '../../useCases/UpdateUser/UpdateUserDTO'
import { IUserRepository } from '../IUserRepository'

export class PostgresUserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne({ username })
  }

  async findByEmail(email: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne({ email })
  }

  async createUser(user: User): Promise<void> {
    const repository = getRepository(User)
    repository.save(user)
  }

  async findAll(): Promise<User[]> {
    const repository = getRepository(User)
    return repository.find({
      select: ['id', 'username', 'email', 'created_at', 'updated_at']
    })
  }

  async findById(id: string): Promise<User> {
    const repository = getRepository(User)
    return repository.findOne(id)
  }

  async deleteUser(id: string): Promise<void> {
    const repository = getRepository(User)
    repository.delete(id)
  }

  async updateUser(data: IUpdateUserRequestDTO): Promise<void> {
    const repository = getRepository(User)
    let user = await repository.findOne(data.id)

    user.email = data.email
    user.username = data.username
    user.updated_at = data.updated_at

    repository.save(user)
  }
}