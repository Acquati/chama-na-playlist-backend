import { Request, Response, NextFunction } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase
  ) { }

  async handle(request: Request, response: Response, _next: NextFunction): Promise<Response> {
    const id = request.params.id
    const { username, email } = request.body

    try {
      await this.updateUserUseCase.execute({
        id,
        username,
        email
      })

      return response.status(200).json({
        message: 'User updated successfully.'
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}