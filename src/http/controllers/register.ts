import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUsersBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
  })

  const { name, email, password } = createUsersBodySchema.parse(request.body)

  try {
    await registerUseCase({ name, email, password })
  } catch {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
