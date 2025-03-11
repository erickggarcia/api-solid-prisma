import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearByGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('fetch near by gyms use case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearByGymsUseCase(gymsRepository)

    })

    it('should be able to fetch near by gyms', async () => {
        await gymsRepository.create({
            id: 'gym-01',
            title: 'Near Gym',
            phone: '(21)99999-9999',
            latitude: -23.0249539,
            longitude: -43.4910563
        })

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Far Gym',
            phone: '(21)99999-9999',
            latitude: -22.8833165,
            longitude: -43.3710233
        })

        const { gyms } = await sut.execute({ userLatitude: -23.025174, userLongitude: -43.4806936 })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' })
        ])
    })

})