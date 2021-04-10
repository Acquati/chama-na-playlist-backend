import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository'
import { GetUserUseCase } from './GetUserUseCase'
import { GetUserController } from './GetUserController'

const postgresUserRepository = new PostgresUserRepository()

const getUserUseCase = new GetUserUseCase(
  postgresUserRepository
)

const getUserController = new GetUserController(
  getUserUseCase
)

export { getUserUseCase, getUserController }