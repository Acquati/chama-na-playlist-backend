import { Request, Response } from 'express'
import { GetManyUsersUseCase } from './GetManyUsersUseCase'

export class GetManyUsersController {
  constructor(
    private getManyUsersUseCase: GetManyUsersUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.getManyUsersUseCase.execute()

      console.log(request.session)

      return response.status(200).json({
        message: users
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}