import { Router, Request, Response } from 'express'
import { checkLoggedIn } from '../middlewares/checkLoggedIn'
import { checkLoggedOut } from '../middlewares/checkLoggedOut'
import { loginUserController } from '../useCases/User/LoginUser'
import { logoutUserController } from '../useCases/User/LogoutUser'
import { updateUserPasswordController } from '../useCases/User/UpdateUserPassword'

const router = Router()

router.post(
  '/login',
  [checkLoggedIn],
  (request: Request, response: Response) => {
    return loginUserController.handle(request, response)
  }
)
router.post(
  '/logout',
  [checkLoggedIn],
  (request: Request, response: Response) => {
    return logoutUserController.handle(request, response)
  }
)
router.patch(
  '/update-password',
  [checkLoggedOut],
  (request: Request, response: Response) => {
    return updateUserPasswordController.handle(request, response)
  }
)

export { router }