import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PostgresTokenRepository } from '../repositories/implementations/PostgresTokenRepository'

const tokenRepository = new PostgresTokenRepository()

interface IJwtPayload {
  id: string
}

function checkJwt(request: Request, response: Response, next: NextFunction) {
  const accessToken = request.headers['x-access-token']
  const refreshToken = request.headers['x-refresh-token']

  if (!accessToken) {
    return response.status(401).json({ message: 'No access token provided.' })
  }
  if (!refreshToken) {
    return response.status(401).json({ message: 'No refresh token provided.' })
  }

  if (!tokenRepository.findOne(refreshToken as string)) {
    return response.status(403).json({ message: 'No refresh token found on database.' })
  }

  let jwtPayload: string | object

  try {
    jwtPayload = jwt.verify(accessToken as string, process.env.ACCESS_TOKEN_SECRET)
    response.locals.jwtPayload = jwtPayload
  } catch (error) {
    return response.status(403).json({ message: 'Unauthorized access token.' })
  }

  try {
    jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    return response.status(403).json({ message: 'Unauthorized refresh token.' })
  }

  next()
}

export { checkJwt }