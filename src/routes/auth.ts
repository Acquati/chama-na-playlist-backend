import { Router, Request, Response } from 'express'
import { checkJwt } from '../middlewares/checkJwt'
import { loginUserController } from '../useCases/User/LoginUser'
import { logoutUserController } from '../useCases/User/LogoutUser'
import { updateUserPasswordController } from '../useCases/User/UpdateUserPassword'

const router = Router()

router.post(
  '/login',
  (request: Request, response: Response) => {
    return loginUserController.handle(request, response)
  }
)
router.post(
  '/logout',
  (request: Request, response: Response) => {
    return logoutUserController.handle(request, response)
  }
)
router.patch(
  '/update-password',
  [checkJwt],
  (request: Request, response: Response) => {
    return updateUserPasswordController.handle(request, response)
  }
)

export { router }