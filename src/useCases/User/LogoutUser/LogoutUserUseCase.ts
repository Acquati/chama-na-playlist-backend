import { IUserRepository } from '../../../repositories/IUserRepository'
import { ITokenRepository } from '../../../repositories/ITokenRepository'
import { ILogoutUserRequestDTO } from './LogoutUserDTO'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class LogoutUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository
  ) { }

  async execute(data: ILogoutUserRequestDTO) {
    const schema = yup.object().shape({
      refreshToken: yup.string().strict().required()
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

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '16h' }
    )

    console.log(this.tokenRepository.findMany())
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET)
    this.tokenRepository.createToken(refreshToken)
    console.log(this.tokenRepository.findMany())

    return { accessToken, refreshToken }
  }
}