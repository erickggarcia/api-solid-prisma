import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'JohnDoe@example.com',
                password: '1234567'
            })

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'JohnDoe@example.com',
                password: '1234567'
            })

        const { token } = authResponse.body

        const response = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(expect.objectContaining({
            email: 'JohnDoe@example.com'
        }))
    })
})
