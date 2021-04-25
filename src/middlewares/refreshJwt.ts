import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PostgresTokenRepository } from '../repositories/implementations/PostgresTokenRepository'

const tokenRepository = new PostgresTokenRepository()

interface IJwtPayload {
  id: string
}

function refreshJwt(request: Request, response: Response, next: NextFunction) {
  const accessToken = request.headers['x-access-token']

  let jwtPayload: string | object

  try {
    jwtPayload = jwt.verify(accessToken as string, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    return response.status(403).json({ message: 'Unauthorized access token.' })
  }

  const { id } = jwtPayload as IJwtPayload
  const newRefreshToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET
  )
  const newAccessToken = jwt.sign(
    { id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '16h' }
  )

  response.setHeader('x-access-token', newAccessToken)
  response.setHeader('x-refresh-token', newRefreshToken)

  next()
}

export { refreshJwt }