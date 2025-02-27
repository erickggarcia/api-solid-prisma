import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
    gymId: string
    userId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) { }

    async execute({ gymId, userId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const checkInTwiceOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInTwiceOnSameDate) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({ gym_id: gymId, user_id: userId })

        return { checkIn }

    }
}