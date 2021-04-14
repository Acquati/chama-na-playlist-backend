import { Router, Request, Response, NextFunction } from 'express'
import { checkJwt } from '../middlewares/checkJwt'
import { authenticateUserController } from '../useCases/User/AuthenticateUser'
import { updateUserPasswordController } from '../useCases/User/UpdateUserPassword'

const router = Router()

router.post(
  '/login',
  (request: Request, response: Response, next: NextFunction) => {
    return authenticateUserController.handle(request, response, next)
  }
)
router.patch(
  '/update-password',
  [checkJwt],
  (request: Request, response: Response, next: NextFunction) => {
    return updateUserPasswordController.handle(request, response, next)
  }
)

export { router }