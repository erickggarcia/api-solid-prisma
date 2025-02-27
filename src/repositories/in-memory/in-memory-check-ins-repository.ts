import { CheckIn, Prisma } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repository"
import { randomUUID } from "node:crypto"
import dayjs from "dayjs"

export class InMemoryCheckInsRepository implements CheckInsRepository {
    private items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate
        }
        )

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {

        const checkIn = {
            id: randomUUID(),
            gym_id: data.gym_id,
            user_id: data.user_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
        }

        this.items.push(checkIn)



        return checkIn

    }

}