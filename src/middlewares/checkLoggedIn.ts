import { Request, Response, NextFunction } from 'express'

function checkLoggedIn(request: Request, response: Response, next: NextFunction) {
  if (request.session.userId) {
    return response.status(400).json({ message: 'User is logged in.' })
  } else {
    next()
  }
}

export { checkLoggedIn }