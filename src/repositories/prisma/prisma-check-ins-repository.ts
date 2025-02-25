import { Prisma, Checkin } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository {
    findByUserIdOnDate(userId: string): Promise<Checkin | null> {
        throw new Error("Method not implemented.");
        console.log(userId)
    }

    async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
        const checkin = await prisma.checkin.create({ data })

        return checkin
    }
}