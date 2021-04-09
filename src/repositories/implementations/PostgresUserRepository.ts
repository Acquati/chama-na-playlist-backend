import { getRepository } from 'typeorm'
import { User } from '../../entities/User'
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
}