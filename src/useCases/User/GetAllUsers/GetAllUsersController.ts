import { Request, Response } from 'express'
import { GetAllUsersUseCase } from './GetAllUsersUseCase'

export class GetAllUsersController {
  constructor(
    private getAllUsersUseCase: GetAllUsersUseCase
  ) { }

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.getAllUsersUseCase.execute()

      return response.status(200).send({ message: users })
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}