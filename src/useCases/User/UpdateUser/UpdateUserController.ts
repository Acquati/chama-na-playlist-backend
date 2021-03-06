import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.session.userId
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
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}