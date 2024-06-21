import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequestParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequestParams) {
    const password_hash = await hash(password, 6)

    const userWithSameId = this.usersRepository.findByEmail(email)

    if (userWithSameId) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
