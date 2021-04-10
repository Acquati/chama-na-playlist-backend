import { IUserRepository } from '../../../repositories/IUserRepository'
import { IUpdateUserRequestDTO } from './UpdateUserDTO'
import * as yup from 'yup'

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) { }

  async execute(data: IUpdateUserRequestDTO) {
    const schema = yup.object().shape({
      id: yup.string().strict().uuid().required(),
      username: yup.string().strict().min(3).max(100).matches(/^[-\w]*[a-zA-Z][-\w]*$/).required(),
      email: yup.string().strict().min(5).max(254).email().required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      throw new Error(error.errors.join(', '))
    }

    const userExists = await this.userRepository.findById(data.id)
    if (!userExists) {
      throw new Error('User does not exist!')
    }

    const usernameAlreadyInUse = await this.userRepository.findByUsername(data.username)
    if (usernameAlreadyInUse) {
      throw new Error('Username already in use!')
    }

    const emailAlreadyInUse = await this.userRepository.findByEmail(data.email)
    if (emailAlreadyInUse) {
      throw new Error('Email already in use!')
    }

    const date = new Date()
    data.updated_at = date

    await this.userRepository.updateUser(data)
  }
}