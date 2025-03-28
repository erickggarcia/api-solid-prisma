import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface RegisterUseCaseRequestParams {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequestParams): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameId = await this.usersRepository.findByEmail(email)

    if (userWithSameId) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
