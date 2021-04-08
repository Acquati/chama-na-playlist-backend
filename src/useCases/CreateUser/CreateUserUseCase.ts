import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../entities/User'
import { IMailProvider } from '../../providers/IMailProvider'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const schema = yup.object().shape({
      username: yup.string().strict().min(3).max(100).matches(/^[-\w]*[a-zA-Z][-\w]*$/).required(),
      email: yup.string().strict().min(5).max(254).email().required(),
      password: yup.string().strict().min(8).max(100).matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required()
    })

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      throw new Error(error.errors.join(', '))
    }

    const usernameAlreadyInUse = await this.usersRepository.findByUsername(data.username)

    if (usernameAlreadyInUse) {
      throw new Error('Username already in use!')
    }

    const emailAlreadyInUse = await this.usersRepository.findByEmail(data.email)

    if (emailAlreadyInUse) {
      throw new Error('Email already in use!')
    }

    data.password = bcrypt.hashSync(data.password)

    const user = new User(data)

    await this.usersRepository.save(user)

    // await this.mailProvider.sendMail({
    //   to: {
    //     name: data.username,
    //     email: data.email
    //   },
    //   from: {
    //     name: 'Equipe Do Meu App',
    //     email: 'equipe@meuapp.com'
    //   },
    //   subject: 'Seja bem-vindo à plataforma.',
    //   body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    // })
  }
}