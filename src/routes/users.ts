import { Router, Request, Response, NextFunction } from 'express'
import { checkJwt } from '../middlewares/checkJwt'
import { createUserController } from '../useCases/User/CreateUser'
import { getManyUsersController } from '../useCases/User/GetManyUsers'
import { updateUserController } from '../useCases/User/UpdateUser'
import { deleteUserController } from '../useCases/User/DeleteUser'
import { getUserController } from '../useCases/User/GetUser'

const router = Router()

router.post(
  '/',
  (request: Request, response: Response, next: NextFunction) => {
    return createUserController.handle(request, response, next)
  }
)
router.get(
  '/',
  (request: Request, response: Response, next: NextFunction) => {
    return getManyUsersController.handle(request, response, next)
  }
)
router.patch(
  '/:id',
  [checkJwt],
  (request: Request, response: Response, next: NextFunction) => {
    return updateUserController.handle(request, response, next)
  }
)
router.get(
  '/:id',
  (request: Request, response: Response, next: NextFunction) => {
    return getUserController.handle(request, response, next)
  }
)
router.delete(
  '/:id',
  [checkJwt],
  (request: Request, response: Response, next: NextFunction) => {
    return deleteUserController.handle(request, response, next)
  }
)

export { router }