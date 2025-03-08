import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { } from "node:test";

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('search gyms use case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to find a gym by query', async () => {
        await gymsRepository.create({
            title: 'Academia do Javascript',
            description: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
            phone: null
        })

        await gymsRepository.create({
            title: 'Academia do Typescript',
            description: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
            phone: null
        })

        const { gyms } = await sut.execute({ query: 'Javascript', page: 1 })
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'Academia do Javascript'
            })
        ])
    })

    it('should be able to fetch a paginated gym by search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Academia ${i}`,
                description: null,
                latitude: -27.2092052,
                longitude: -49.6401091,
                phone: null
            })
        }

        const { gyms } = await sut.execute({ query: 'Academia', page: 2 })
        console.log(gyms)
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'Academia 21'
            }),
            expect.objectContaining({
                title: 'Academia 22'
            })
        ])
    })
})