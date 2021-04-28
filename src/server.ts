import * as dotenv from 'dotenv'

dotenv.config()

import 'reflect-metadata'
import createConnection from './database'
import { getRepository } from 'typeorm'
import { Session } from './entities/Session'
import session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import { app } from './app'
import { routes } from './routes'

declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
  // all user data
  // export interface SessionData {
  //   user: { [key: string]: any }
  // }
}

createConnection()
  .then(() => {
    app.use(session({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 60 * 60 * 24
      }).connect(getRepository(Session)),
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET
    }))

    app.use(routes)

    app.listen(3333, () => {
      console.log('Express server has started on port 3333. Open http://localhost:3333/users to see results.')
    })
  })
  .catch(error => console.log(error))