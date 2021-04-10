import { Router, Request, Response, NextFunction } from 'express'
import { createUserController } from '../useCases/CreateUser'
import { listAllUsersController } from '../useCases/ListAllUsers'

const router = Router()

router.get(
  '/',
  (request: Request, response: Response, _next: NextFunction) => {
    return listAllUsersController.handle(request, response)
  }
)
router.post(
  '/',
  (request: Request, response: Response, _next: NextFunction) => {
    return createUserController.handle(request, response)
  }
)

export { router }