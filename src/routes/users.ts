import { Router, Request, Response } from 'express'
import { checkLoggedIn } from '../middlewares/checkLoggedIn'
import { checkLoggedOut } from '../middlewares/checkLoggedOut'
import { createUserController } from '../useCases/User/CreateUser'
import { getManyUsersController } from '../useCases/User/GetManyUsers'
import { updateUserController } from '../useCases/User/UpdateUser'
import { deleteUserController } from '../useCases/User/DeleteUser'
import { getUserController } from '../useCases/User/GetUser'

const router = Router()

router.post(
  '/',
  [checkLoggedOut],
  (request: Request, response: Response) => {
    return createUserController.handle(request, response)
  }
)
router.get(
  '/',
  (request: Request, response: Response) => {
    return getManyUsersController.handle(request, response)
  }
)
router.patch(
  '/',
  [checkLoggedIn],
  (request: Request, response: Response) => {
    return updateUserController.handle(request, response)
  }
)
router.get(
  '/:id',
  (request: Request, response: Response) => {
    return getUserController.handle(request, response)
  }
)
router.delete(
  '/',
  [checkLoggedIn],
  (request: Request, response: Response) => {
    return deleteUserController.handle(request, response)
  }
)

export { router }