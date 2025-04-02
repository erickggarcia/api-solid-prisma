import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isUserAdmin = false) {

    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'JohnDoe@example.com',
            password_hash: await hash('1234567', 6),
            role: isUserAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'JohnDoe@example.com',
            password: '1234567'
        })

    const { token } = authResponse.body

    return {
        token
    }
}