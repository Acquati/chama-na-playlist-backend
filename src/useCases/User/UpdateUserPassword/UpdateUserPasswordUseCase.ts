import { IUserRepository } from '../../../repositories/IUserRepository'
import { IUpdateUserPasswordRequestDTO } from './UpdateUserPasswordDTO'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'

export class UpdateUserPasswordUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IUpdateUserPasswordRequestDTO) {
    const schema = yup.object().shape({
      email: yup.string().strict().min(5).max(254).email().required(),
      oldPassword: yup.string().strict().min(8).max(100).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),
      newPassword: yup.string().strict().min(8).max(100).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      throw new Error(error.errors.join(', '))
    }

    const user = await this.userRepository.findByEmailGetPassword(data.email)
    if (!user) {
      throw new Error('No user registered with this email.')
    }

    if (!bcrypt.compareSync(data.oldPassword, user.password)) {
      throw new Error('Wrong password.')
    }

    data.newPassword = bcrypt.hashSync(data.newPassword)
    const date = new Date()
    data.updated_at = date

    await this.userRepository.updateUserPassword(data)
  }
}