import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('check in use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInRepository)
    })


    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: '12345',
            userId: '6789'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})