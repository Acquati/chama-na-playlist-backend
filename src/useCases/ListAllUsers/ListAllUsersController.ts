import { Request, Response } from 'express'
import { ListAllUsersUseCase } from './ListAllUsersUseCase'

export class ListAllUsersController {
  constructor(
    private listAllUsersUseCase: ListAllUsersUseCase
  ) { }

  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.listAllUsersUseCase.execute()

      return response.status(200).send({ message: users })
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}