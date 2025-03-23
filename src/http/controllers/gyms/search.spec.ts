import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { app } from '@/app'

describe('search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to search a gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    title: 'Academia do Javascript',
                    description: '',
                    phone: '',
                    latitude: -22.9960458,
                    longitude: -43.4091901,
                }
            )

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    title: 'Academia do Typescript',
                    description: '',
                    phone: '',
                    latitude: -22.9960458,
                    longitude: -43.4091901,
                }
            )

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'Javascript'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([expect.objectContaining({
            title: 'Academia do Javascript'
        })
        ])
    })
})
