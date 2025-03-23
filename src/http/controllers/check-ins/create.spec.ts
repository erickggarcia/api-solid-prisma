import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from 'supertest'
import { prisma } from "@/lib/prisma";

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Academia do Javascript',
                description: '',
                phone: '',
                latitude: -22.9960458,
                longitude: -43.4091901,
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    latitude: -22.9960458,
                    longitude: -43.4091901,
                }
            )

        expect(response.statusCode).toEqual(201)
    })
})