export interface IUpdateUserPasswordRequestDTO {
  email: string
  oldPassword: string
  newPassword: string
  updated_at?: Date
}