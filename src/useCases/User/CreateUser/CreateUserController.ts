import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body

    try {
      await this.createUserUseCase.execute({
        username,
        email,
        password
      })

      return response.status(201).json({
        message: 'User created successfully.'
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}