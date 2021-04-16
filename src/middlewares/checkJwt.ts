import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface IJwtPayload {
  id: string
}

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers['x-access-token']

  if (!token) {
    return response.status(401).json({ message: 'No access token provided.' })
  }

  let jwtPayload: string | object

  try {
    jwtPayload = jwt.verify(token as string, process.env.JWT_SECRET)
    response.locals.jwtPayload = jwtPayload
  } catch (error) {
    return response.status(403).json({ message: 'Unauthorized access token.' })
  }

  const { id } = jwtPayload as IJwtPayload
  const newToken = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '16h' }
  )

  response.setHeader('x-access-token', newToken)

  next()
}