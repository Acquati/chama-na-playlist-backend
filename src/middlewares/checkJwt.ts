import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {
  const token = <string>request.headers['token']
  let jwtPayload: any

  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET)
    response.locals.jwtPayload = jwtPayload
  } catch (error) {
    return response.status(401).json({ message: 'Unauthorized access.' })
  }

  const { id, email } = jwtPayload
  const newToken = jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: '16h' }
  )

  response.setHeader('token', newToken)

  next()
}