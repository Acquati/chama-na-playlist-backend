import { IUserRepository } from '../../../repositories/IUserRepository'
import { ILoginUserRequestDTO } from './LoginUserDTO'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'
export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: ILoginUserRequestDTO) {
    const schema = yup.object().shape({
      email: yup.string().strict().min(5).max(254).email().required(),
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

    const user = await this.userRepository.findByEmailWithPassword(data.email)
    if (!user) {
      throw {
        statusCode: 400,
        message: 'No user registered with this email.'
      }
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw {
        statusCode: 400,
        message: 'Wrong password.'
      }
    }

    return user.id
  }
}