import { makeValidateCheckInsUseCase } from "@/use-cases/factories/make-validate-check-ins-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {

    const validateCheckInsParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInsParamsSchema.parse(request.params)

    const validateCheckInUseCase = makeValidateCheckInsUseCase()

    await validateCheckInUseCase.execute({
        checkInId
    })

    return reply.status(204).send()
}