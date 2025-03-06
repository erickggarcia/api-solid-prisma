import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })


    it('should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            title: 'Academia do Nodejs',
            description: 'Essa é a academia do Nodejs',
            phone: '21 99999-9999',
            latitude: -22.9960458,
            longitude: -43.4091901,
        })

        expect(gym.id).toEqual(expect.any(String))

    })
})