import { IUserRepository } from '../../../repositories/IUserRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'

export class DeleteUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IDeleteUserRequestDTO) {
    const schema = yup.object().shape({
      id: yup.string().strict().uuid().required(),
      password: yup.string().strict().min(8).max(100).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      throw {
        statusCode: 400,
        message: error.errors.join(', ')
      }
    }

    const user = await this.userRepository.findByIdWithPassword(data.id)
    if (!user) {
      throw {
        statusCode: 400,
        message: 'User does not exist.'
      }
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw {
        statusCode: 400,
        message: 'Wrong password.'
      }
    }

    await this.userRepository.deleteUser(data.id)
  }
}