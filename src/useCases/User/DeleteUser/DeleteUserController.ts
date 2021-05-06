import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.session.userId
    const { password } = request.body

    try {
      await this.deleteUserUseCase.execute({
        id, password
      })

      request.session.destroy(function (error) {
        if (error) {
          throw {
            statusCode: 500,
            message: error
          }
        }
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