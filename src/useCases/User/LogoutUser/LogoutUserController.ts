import { Request, Response } from 'express'
import { LogoutUserUseCase } from './LogoutUserUseCase'

export class LogoutUserController {
  constructor(
    private LogoutUserUseCase: LogoutUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken = request.headers['x-refresh-token']

    try {
      const data = await this.LogoutUserUseCase.execute({
        refreshToken
      })

      return response.status(204)
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}