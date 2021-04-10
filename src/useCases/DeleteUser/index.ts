import { PostgresUserRepository } from '../../repositories/implementations/PostgresUserRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { DeleteUserController } from './DeleteUserController'

const postgresUserRepository = new PostgresUserRepository()

const deleteUserUseCase = new DeleteUserUseCase(
  postgresUserRepository
)

const deleteUserController = new DeleteUserController(
  deleteUserUseCase
)

export { deleteUserUseCase, deleteUserController }