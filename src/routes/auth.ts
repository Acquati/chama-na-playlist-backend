import { Router, Request, Response, NextFunction } from 'express'
import { authenticateUserController } from '../useCases/User/AuthenticateUser'

const router = Router()

router.post(
  '/login',
  (request: Request, response: Response, next: NextFunction) => {
    return authenticateUserController.handle(request, response, next)
  }
)

export { router }