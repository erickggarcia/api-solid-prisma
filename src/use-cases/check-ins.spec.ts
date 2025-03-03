import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('check in use case', () => {
    beforeEach(() => {
        vi.useFakeTimers()

        gymRepository = new InMemoryGymsRepository()
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInRepository, gymRepository)

        gymRepository.items.push({
            id: 'js-1',
            description: '',
            title: 'Academia do javascript',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            phone: ''
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })


    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'js-1',
            userId: '6789',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice on the same day', async () => {

        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'js-1',
            userId: '6789',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(async () => {
            await sut.execute({
                gymId: 'js-1',
                userId: '6789',
                userLatitude: 0,
                userLongitude: 0
            })
        }).rejects.toBeInstanceOf(Error)
    })


    it('should be able to check in twice but on diferente date', async () => {

        vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'js-1',
            userId: '6789',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'js-1',
            userId: '6789',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})