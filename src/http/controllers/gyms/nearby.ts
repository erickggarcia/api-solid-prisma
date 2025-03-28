import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearBy(request: FastifyRequest, reply: FastifyReply) {
    const fetchNearByGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = fetchNearByGymsQuerySchema.parse(request.query)

    const fetchNearByGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearByGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })


    return reply.status(200).send({
        gyms,
    })
}