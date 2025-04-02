import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { app } from '@/app'

describe('nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    title: 'Near Gym',
                    description: '',
                    phone: '(21)99999-9999',
                    latitude: -23.0249539,
                    longitude: -43.4910563
                }
            )


        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    title: 'Far Gym',
                    description: '',
                    phone: '(21)99999-9999',
                    latitude: -22.8833165,
                    longitude: -43.3710233
                }
            )

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -23.025174,
                longitude: -43.4806936
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([expect.objectContaining({
            title: 'Near Gym'
        })
        ])
    })

})
