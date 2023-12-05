import { registerUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        await registerUseCase({ name, email, password })

        return reply.status(201).send({ msg: 'Usuário criado com sucesso' })

    } catch (error) {
        return reply.status(409).send({ msg: 'Algum erro ocorreu' })
    }

}