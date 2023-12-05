import { hash } from 'bcryptjs'

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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })
}