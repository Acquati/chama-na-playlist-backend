import { Request, Response, NextFunction } from 'express'
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase'

export class UpdateUserPasswordController {
  constructor(
    private updateUserPasswordUseCase: UpdateUserPasswordUseCase
  ) { }

  async handle(request: Request, response: Response, _next: NextFunction): Promise<Response> {
    const id = response.locals.jwtPayload.id
    const { oldPassword, newPassword } = request.body

    try {
      await this.updateUserPasswordUseCase.execute({
        id,
        oldPassword,
        newPassword
      })

      return response.status(200).json({
        message: 'Password updated successfully.'
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}