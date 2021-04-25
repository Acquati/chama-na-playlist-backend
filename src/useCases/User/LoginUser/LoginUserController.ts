import { Request, Response } from 'express'
import { LoginUserUseCase } from './LoginUserUseCase'

export class LoginUserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    try {
      const data = await this.loginUserUseCase.execute({
        email,
        password
      })

      return response.status(200).json({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}