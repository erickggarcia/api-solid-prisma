import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6) //segundo parâmetro pode ser gerado com salt ou com número de rounds

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (userWithSameEmail) throw new Error('Algum erro ocorreu')

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create(
        {
            name,
            email,
            password_hash,
        }
    )
}