import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { GetManyUsersUseCase } from './GetManyUsersUseCase'
import { GetManyUsersController } from './GetManyUsersController'

const postgresUserRepository = new PostgresUserRepository()

const getManyUsersUseCase = new GetManyUsersUseCase(
  postgresUserRepository
)

const getManyUsersController = new GetManyUsersController(
  getManyUsersUseCase
)

export { getManyUsersUseCase, getManyUsersController }