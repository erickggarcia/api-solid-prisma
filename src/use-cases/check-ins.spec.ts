import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('check in use case', () => {
    beforeEach(() => {
        vi.useFakeTimers()

        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInRepository)
    })

    afterEach(() => {
        vi.useRealTimers()
    })


    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: '12345',
            userId: '6789'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice on the same day', async () => {

        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: '12345',
            userId: '6789'
        })

        await expect(async () => {
            await sut.execute({
                gymId: '12345',
                userId: '6789'
            })
        }).rejects.toBeInstanceOf(Error)
    })


    it('should be able to check in twice but on diferente date', async () => {

        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: '12345',
            userId: '6789'
        })

        vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: '12345',
            userId: '6789'
        })

        expect(checkIn).toEqual(expect.any(String))

    })
})