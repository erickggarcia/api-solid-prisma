import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Erick Garcia',
    email: 'erick@gmail.com',
  },
})

export const app = fastify()
