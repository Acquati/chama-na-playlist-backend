import { Request, Response } from 'express'
import { GetUserUseCase } from './GetUserUseCase'

export class GetUserController {
  constructor(
    private getUserUseCase: GetUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    try {
      const user = await this.getUserUseCase.execute({
        id
      })

      return response.status(200).json({
        message: user
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}