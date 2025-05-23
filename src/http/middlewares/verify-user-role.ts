import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: 'MEMBER' | 'ADMIN') {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user

        if (roleToVerify !== role) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }
    }

}