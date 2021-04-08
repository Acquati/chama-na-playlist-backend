import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { ListAllUsersUseCase } from './ListAllUsersUseCase'
import { ListAllUsersController } from './ListAllUsersController'

const postgresUsersRepository = new PostgresUsersRepository()

const listAllUsersUseCase = new ListAllUsersUseCase(
  postgresUsersRepository
)

const listAllUsersController = new ListAllUsersController(
  listAllUsersUseCase
)

export { listAllUsersUseCase, listAllUsersController }