import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ) { }

  async handle(_request: Request, response: Response): Promise<Response> {
    const id = response.locals.jwtPayload.id

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