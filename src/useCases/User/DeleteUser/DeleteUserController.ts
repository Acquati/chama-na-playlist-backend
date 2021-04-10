import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    try {
      await this.deleteUserUseCase.execute({
        id
      })

      return response.status(200).send({
        message: 'User deleted successfully.'
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}