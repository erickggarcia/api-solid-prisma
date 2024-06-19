import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequestParams {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequestParams) {
  const password_hash = await hash(password, 6)

  const userWithSameId = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameId) {
    throw new Error('Email already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}
