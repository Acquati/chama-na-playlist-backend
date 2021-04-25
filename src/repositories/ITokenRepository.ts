export interface ITokenRepository {
  findMany(): Promise<string[]>
  createToken(refreshToken: string): Promise<void>
  findOne(refreshToken: string): Promise<boolean>
}