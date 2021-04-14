import { IUserRepository } from '../../../repositories/IUserRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IAuthenticateUserRequestDTO) {
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

    const user = await this.userRepository.findByEmailGetPassword(data.email)
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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '16h' }
    )

    return token
  }
}