import { Router } from 'express'
import { router as users } from './users'
import { router as auth } from './auth'

const routes = Router()

routes.use('/users', users)
routes.use('/auth', auth)

export { routes }