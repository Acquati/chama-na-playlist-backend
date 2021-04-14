import { PostgresUserRepository } from '../../../repositories/implementations/PostgresUserRepository'
import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase'
import { UpdateUserPasswordController } from './UpdateUserPasswordController'

const postgresUserRepository = new PostgresUserRepository()

const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
  postgresUserRepository
)

const updateUserPasswordController = new UpdateUserPasswordController(
  updateUserPasswordUseCase
)

export { updateUserPasswordUseCase, updateUserPasswordController }