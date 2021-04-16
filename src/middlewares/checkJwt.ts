import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IJwtPayload } from './IJwtPayload'

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers['x-access-token']

  if (!token) {
    return response.status(401).json({ message: 'No token provided.' })
  }

  let jwtPayload: string | object

  try {
    jwtPayload = jwt.verify(token as string, process.env.JWT_SECRET)
    response.locals.jwtPayload = jwtPayload
  } catch (error) {
    return response.status(401).json({ message: 'Unauthorized access.' })
  }

  const { id, email } = jwtPayload as IJwtPayload
  const newToken = jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: '16h' }
  )

  response.setHeader('x-access-token', newToken)

  next()
}