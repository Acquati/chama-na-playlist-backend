import { ITokenRepository } from '../ITokenRepository'

export class PostgresTokenRepository implements ITokenRepository {
  private refreshTokens: string[] = []

  async findMany(): Promise<string[]> {
    return this.refreshTokens
  }

  async createToken(refreshToken: string): Promise<void> {
    this.refreshTokens.push(refreshToken)
  }

  async findOne(refreshToken: string): Promise<boolean> {
    return this.refreshTokens.includes(refreshToken)
  }
}