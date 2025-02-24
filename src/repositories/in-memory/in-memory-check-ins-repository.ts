import { Checkin, Prisma } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repository"
import { randomUUID } from "node:crypto"

export class InMemoryCheckInsRepository implements CheckInsRepository {
    private items: Checkin[] = []


    async create(data: Prisma.CheckinUncheckedCreateInput) {

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