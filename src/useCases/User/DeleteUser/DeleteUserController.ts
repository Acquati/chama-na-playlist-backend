import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.session.userId

    try {
      await this.deleteUserUseCase.execute({
        id
      })

      return response.status(200).json({
        message: 'User deleted successfully.'
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}