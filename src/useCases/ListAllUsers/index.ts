import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository'
import { ListAllUsersUseCase } from './ListAllUsersUseCase'
import { ListAllUsersController } from './ListAllUsersController'

const postgresUserRepository = new PostgresUserRepository()

const listAllUsersUseCase = new ListAllUsersUseCase(
  postgresUserRepository
)

const listAllUsersController = new ListAllUsersController(
  listAllUsersUseCase
)

export { listAllUsersUseCase, listAllUsersController }