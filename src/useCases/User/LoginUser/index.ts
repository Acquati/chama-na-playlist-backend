import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { PostgresTokenRepository } from '../../../repositories/implementations/PostgresTokenRepository'
import { LoginUserUseCase } from './LoginUserUseCase'
import { LoginUserController } from './LoginUserController'

const postgresUserRepository = new PostgresUserRepository()
const postgresTokenRepository = new PostgresTokenRepository()

const loginUserUseCase = new LoginUserUseCase(
  postgresUserRepository,
  postgresTokenRepository
)

const loginUserController = new LoginUserController(
  loginUserUseCase
)

export { loginUserUseCase, loginUserController }