import { IUserRepository } from '../../repositories/IUserRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'
import * as yup from 'yup'

export class DeleteUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IDeleteUserRequestDTO) {
    const schema = yup.object().shape({
      id: yup.string().strict().uuid().required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      throw new Error(error.errors.join(', '))
    }

    const userExists = await this.userRepository.findById(data.id)
    if (!userExists) {
      throw new Error('User does not exist!')
    }

    await this.userRepository.deleteUser(data.id)
  }
}