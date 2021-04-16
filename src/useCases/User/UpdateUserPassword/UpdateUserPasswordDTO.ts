export interface IUpdateUserPasswordRequestDTO {
  id: string
  oldPassword: string
  newPassword: string
  updated_at?: Date
}