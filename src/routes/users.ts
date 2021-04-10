import { Router, Request, Response, NextFunction } from 'express'
import { createUserController } from '../useCases/User/CreateUser'
import { getAllUsersController } from '../useCases/User/GetAllUsers'
import { updateUserController } from '../useCases/User/UpdateUser'
import { deleteUserController } from '../useCases/User/DeleteUser'
import { getUserController } from '../useCases/User/GetUser'

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
router.get(
  '/:id',
  (request: Request, response: Response, _next: NextFunction) => {
    return getUserController.handle(request, response)
  }
)
router.delete(
  '/:id',
  (request: Request, response: Response, _next: NextFunction) => {
    return deleteUserController.handle(request, response)
  }
)

export { router }