import { IUserRepository } from '../../../repositories/IUserRepository'

export class GetManyUsersUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute() {
    const users = await this.userRepository.findMany()

    return users
  }
}