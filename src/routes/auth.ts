import { Router, Request, Response } from 'express'
import { checkLoggedIn } from '../middlewares/checkLoggedIn'
import { checkLoggedOut } from '../middlewares/checkLoggedOut'
import { loginUserController } from '../useCases/Authentication/LoginUser'
import { logoutUserController } from '../useCases/Authentication/LogoutUser'
import { updateUserPasswordController } from '../useCases/Authentication/UpdateUserPassword'
import { getManySessionsController } from '../useCases/Authentication/GetManySessions'

const router = Router()

router.post(
  '/login',
  [checkLoggedOut],
  (request: Request, response: Response) => {
    return loginUserController.handle(request, response)
  }
)
router.get(
  '/logout',
  [checkLoggedIn],
  (request: Request, response: Response) => {
    return logoutUserController.handle(request, response)
  }
)
router.patch(
  '/update-password',
  [checkLoggedIn],
  (request: Request, response: Response) => {
    return updateUserPasswordController.handle(request, response)
  }
)
router.get(
  '/session',
  (request: Request, response: Response) => {
    return getManySessionsController.handle(request, response)
  }
)


export { router }