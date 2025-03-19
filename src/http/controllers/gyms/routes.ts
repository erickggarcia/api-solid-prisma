import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { search } from "./search";
import { nearBy } from "./nearby";
import { create } from "./create";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearBy)

    app.post('/gyms', create)
}