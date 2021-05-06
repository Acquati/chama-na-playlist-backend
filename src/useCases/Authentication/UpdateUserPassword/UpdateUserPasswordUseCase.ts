import { IUserRepository } from '../../../repositories/IUserRepository'
import { IUpdateUserPasswordRequestDTO } from './UpdateUserPasswordDTO'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'

export class UpdateUserPasswordUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IUpdateUserPasswordRequestDTO) {
    const schema = yup.object().shape({
      id: yup.string().strict().uuid().required(),
      oldPassword: yup.string().strict().min(8).max(100).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),
      newPassword: yup.string().strict().min(8).max(100).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required()
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

    if (!bcrypt.compareSync(data.oldPassword, user.password)) {
      throw {
        statusCode: 400,
        message: 'Wrong password.'
      }
    }

    data.newPassword = bcrypt.hashSync(data.newPassword)
    const date = new Date()
    data.updated_at = date

    await this.userRepository.updateUserPassword(data)
  }
}