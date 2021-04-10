import { Router } from 'express'
import { router as users } from './users'

const routes = Router()

routes.use('/users', users)

export { routes }