import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // sut means system under test
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {

    const email = 'johndoe@example.com'

    const { user } = await sut.execute({
      name: 'john doe',
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {

    const email = 'johndoe@example.com'

    const { user } = await sut.execute({
      name: 'john doe',
      email,
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to be able to register with the same email twice', async () => {

    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'john doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'john doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
