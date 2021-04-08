import { Router, Request, Response, NextFunction } from 'express'
import { createUserController } from './useCases/CreateUser'
import { listAllUsersController } from './useCases/ListAllUsers'

const router = Router()

// function postUsers(request: Request, response: Response, _next: NextFunction) {
//   return createUserController.handle(request, response)
// }

router.get('/users', (request: Request, response: Response, _next: NextFunction) => {
  return listAllUsersController.handle(request, response)
})

router.post('/users', (request: Request, response: Response, _next: NextFunction) => {
  return createUserController.handle(request, response)
})

// router.post('/users', postUsers)

export { router }