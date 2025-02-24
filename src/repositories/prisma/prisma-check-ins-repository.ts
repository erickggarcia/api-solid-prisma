import { Prisma, Checkin } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository {
    async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
        const checkin = await prisma.checkin.create({ data })

        return checkin
    }
}