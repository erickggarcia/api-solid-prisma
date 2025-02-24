import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { it, describe, beforeEach, expect } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('get profile use case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to recover user id', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')

    })


    it('should not be able to get user profile with wrong email', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@example.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({
            userId: 'non-existing-id'
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })


})