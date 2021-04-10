import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { GetAllUsersUseCase } from './GetAllUsersUseCase'
import { GetAllUsersController } from './GetAllUsersController'

const postgresUserRepository = new PostgresUserRepository()

const getAllUsersUseCase = new GetAllUsersUseCase(
  postgresUserRepository
)

const getAllUsersController = new GetAllUsersController(
  getAllUsersUseCase
)

export { getAllUsersUseCase, getAllUsersController }