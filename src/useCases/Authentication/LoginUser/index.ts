import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { LoginUserUseCase } from './LoginUserUseCase'
import { LoginUserController } from './LoginUserController'

const postgresUserRepository = new PostgresUserRepository()

const loginUserUseCase = new LoginUserUseCase(
  postgresUserRepository
)

const loginUserController = new LoginUserController(
  loginUserUseCase
)

export { loginUserUseCase, loginUserController }