import { IUserRepository } from '../../repositories/IUserRepository'

export class ListAllUsersUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute() {
    try {
      const users = await this.userRepository.findAll()

      return users
    } catch (error) {
      throw new Error(error)
    }
  }
}