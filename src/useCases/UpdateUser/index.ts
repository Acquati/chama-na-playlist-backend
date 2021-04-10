import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository'
import { UpdateUserUseCase } from './UpdateUserUseCase'
import { UpdateUserController } from './UpdateUserController'

const postgresUserRepository = new PostgresUserRepository()

const updateUserUseCase = new UpdateUserUseCase(
  postgresUserRepository
)

const updateUserController = new UpdateUserController(
  updateUserUseCase
)

export { updateUserUseCase, updateUserController }