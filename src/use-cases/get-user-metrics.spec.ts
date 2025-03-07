import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { beforeAll, describe, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('get checkIn metrics use case', () => {
    beforeAll(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })


    it('should be able to check-ins count from metrics', async () => {

        await checkInsRepository.create(
            {
                gym_id: 'gym-01',
                user_id: 'user-01',
            }
        )

        await checkInsRepository.create(
            {
                gym_id: 'gym-02',
                user_id: 'user-01',
            }
        )

        const { checkInsCount } = await sut.execute({ userId: 'user-01' })

        expect(checkInsCount).toEqual(2)


    })

})