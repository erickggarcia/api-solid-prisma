import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a user', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'JohnDoe@example.com',
                password: '1234567',
            })

        expect(response.statusCode).toEqual(201)
    })
})