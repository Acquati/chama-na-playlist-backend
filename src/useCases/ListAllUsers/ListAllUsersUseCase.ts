import { IUsersRepository } from '../../repositories/IUsersRepository'

export class ListAllUsersUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) { }

  async execute() {
    try {
      const users = await this.usersRepository.find()

      return users
    } catch (error) {
      throw new Error(error)
    }
  }
}