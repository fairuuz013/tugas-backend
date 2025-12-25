import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import config from '../utils/env'
import path from 'node:path'

describe('GET /api/products', () => {
  

    it('should return 200 and list of products', async () => {
        const res = await request(app).get('/api/products')

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(Array.isArray(res.body.data)).toBe(true)
    })
})

describe('POST /api/products', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should return 401 if no token provided', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: 'abc',
                description: 'abc',
                price: 100,
                stock: 5,
                categoryId: 11
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body.success).toBe(false)
    })


    it('Should return 201 and product that has been created', async () => {
        const res = await request(app)
            .post('/api/products')
            .field('name', 'abc')
            .field('description', 'abc')
            .field('price', 100)
            .field('stock', 5)
            .field('categoryId', 7)
            .attach('image', path.resolve(__dirname, '../../images.jpeg'))
            // .send({
            //     name: "abc",
            //     description: "def",
            //     price: 1,
            //     stock: 1,
            //     categoryId: 1,
            //     image: "image/asdas.jpg"
            // })
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(201)
        expect(res.body.success).toBe(true)
    })
})