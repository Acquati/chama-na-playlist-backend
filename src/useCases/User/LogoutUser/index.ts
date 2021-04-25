import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { PostgresTokenRepository } from '../../../repositories/implementations/PostgresTokenRepository'
import { LogoutUserUseCase } from './LogoutUserUseCase'
import { LogoutUserController } from './LogoutUserController'

const postgresUserRepository = new PostgresUserRepository()
const postgresTokenRepository = new PostgresTokenRepository()

const logoutUserUseCase = new LogoutUserUseCase(
  postgresUserRepository,
  postgresTokenRepository
)

const logoutUserController = new LogoutUserController(
  logoutUserUseCase
)

export { logoutUserUseCase, logoutUserController }