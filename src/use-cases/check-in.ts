import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { Checkin } from "@prisma/client";

interface CheckInUseCaseRequest {
    gymId: string
    userId: string
}

interface CheckInUseCaseResponse {
    checkIn: Checkin
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({ gymId, userId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const checkInTwiceOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInTwiceOnSameDate) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({ gym_id: gymId, user_id: userId })

        return { checkIn }

    }
}