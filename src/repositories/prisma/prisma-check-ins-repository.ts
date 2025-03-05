import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository {
    findByUserIdOnDate(userId: string): Promise<CheckIn | null> {
        console.log(userId)
        throw new Error("Method not implemented.");
    }

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkin = await prisma.checkIn.create({ data })

        return checkin
    }
}