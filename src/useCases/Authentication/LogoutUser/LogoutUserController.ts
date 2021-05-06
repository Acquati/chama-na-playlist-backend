import { Request, Response } from 'express'

export class LogoutUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      request.session.destroy(function (error) {
        if (error) {
          throw {
            statusCode: 500,
            message: error
          }
        }
      })

      return response.status(200).json({
        message: 'User logged out successfully.'
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}