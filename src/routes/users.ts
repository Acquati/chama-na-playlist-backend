import { Router, Request, Response, NextFunction } from 'express'
import { createUserController } from '../useCases/CreateUser'
import { getAllUsersController } from '../useCases/GetAllUsers'
import { updateUserController } from '../useCases/UpdateUser'
import { deleteUserController } from '../useCases/DeleteUser'

const router = Router()

router.post(
  '/',
  (request: Request, response: Response, _next: NextFunction) => {
    return createUserController.handle(request, response)
  }
)
router.get(
  '/',
  (request: Request, response: Response, _next: NextFunction) => {
    return getAllUsersController.handle(request, response)
  }
)
router.patch(
  '/:id',
  (request: Request, response: Response, _next: NextFunction) => {
    return updateUserController.handle(request, response)
  }
)
router.delete(
  '/:id',
  (request: Request, response: Response, _next: NextFunction) => {
    return deleteUserController.handle(request, response)
  }
)

export { router }