import { IUserRepository } from '../../../repositories/IUserRepository'
import { IGetUserRequestDTO } from './GetUserDTO'
import * as yup from 'yup'

export class GetUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IGetUserRequestDTO) {
    const schema = yup.object().shape({
      id: yup.string().strict().uuid().required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      throw {
        statusCode: 400,
        message: error.errors.join(', ')
      }
    }

    const userExists = await this.userRepository.findById(data.id)
    if (!userExists) {
      throw {
        statusCode: 400,
        message: 'User does not exist!'
      }
    }

    const user = await this.userRepository.findById(data.id)

    return user
  }
}