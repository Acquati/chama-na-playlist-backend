import { Request, Response } from 'express'
import { TypeormStore } from 'connect-typeorm'
import { getRepository } from 'typeorm'
import { Session } from '../../../entities/Session'
import { SessionData } from 'express-session'

export class GetManySessionsController {
  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const sessionRepository = new TypeormStore().connect(getRepository(Session))

      sessionRepository.all(function (error: string, result: SessionData[]) {
        if (error) {
          throw {
            statusCode: 500,
            message: error
          }
        }

        return response.status(200).json({
          message: result
        })
      })
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}