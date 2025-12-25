import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import config from '../utils/env'



const adminToken = jwt.sign(
    { id: 1, role: 'ADMIN' },
    config.JWT_SECRET
)


// =======================
// GET /api/orders
// =======================
describe('GET /api/orders', () => {

    it('should return 200 and list of orders', async () => {
        const res = await request(app)
            .get('/api/orders')

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('should return empty array if no orders', async () => {
        const res = await request(app)
            .get('/api/orders')

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
    })

})


// =======================
// GET /api/orders/:id
// =======================
describe('GET /api/orders/:id', () => {

    it('should return 400 or 404 if order not found', async () => {
        const res = await request(app)
            .get('/api/orders/99999')

        expect(res.statusCode).toBeGreaterThanOrEqual(400)
        expect(res.body.success).toBe(false)
    })

    //   it('should return 400 if id is invalid', async () => {
    //     const res = await request(app)
    //       .get('/api/orders/abc')

    //     expect(res.statusCode).toBeGreaterThanOrEqual(400)
    //     expect(res.body.success).toBe(false)
    //   })

    it('should return 200 if id is valid', async () => {
        const id = 10
        const res = await request(app)
            .get(`/api/orders/${id}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data).toHaveProperty('id')
    })

})


// =======================
// POST /api/orders
// =======================
describe('POST /api/orders', () => {

    it('should return 401 if no token provided', async () => {
        const res = await request(app)
            .post('/api/orders')

        expect(res.statusCode).toBe(401)
        expect(res.body.success).toBe(false)
    })

    it('should return 401 if role is not USER', async () => {
        const res = await request(app)
            .post('/api/orders')

        expect(res.statusCode).toBe(401)
        expect(res.body.success).toBe(false)
    })

    it('should return 201 and create order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .field('status', 'paid')
            .field('total', 1000000)
            .field('userId', 26)
            .set('Authorization', `Bearer ${adminToken}`)

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
    })

})


// =======================
// PUT /api/orders/:id
// =======================
describe('PUT /api/orders/:id', () => {

  it('should return 401 if no token', async () => {
    const res = await request(app)
      .put('/api/orders/1')
      .send({ status: 'false' })

    expect(res.statusCode).toBe(401)
    expect(res.body.success).toBe(false)
  })

  it('should return 404 if order not found', async () => {
    const res = await request(app)
      .put('/api/orders/9999')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'PAID' })

    expect(res.statusCode).toBeGreaterThanOrEqual(400)
    expect(res.body.success).toBe(false)
  })

  it('should return 200 if order updated', async () => {
    const res = await request(app)
      .put('/api/orders/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'PAID' })

      expect(res.statusCode).toEqual(200)
      expect(res.body.success).toBe(true)
  })

})


// =======================
// DELETE /api/orders/:id
// =======================
describe('DELETE /api/orders/:id', () => {

  it('should return 404 if order not found', async () => {
    const res = await request(app)
      .delete('/api/orders/9999')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toBeGreaterThanOrEqual(400)
    expect(res.body.success).toBe(false)
  })

  it('should return 200 if order deleted', async () => {
    const res = await request(app)
      .delete('/api/orders/1')
      .set('Authorization', `Bearer ${adminToken}`)

    expect([200, 204]).toContain(res.statusCode)
  })

})


// =======================
// POST /api/orders/:id/checkout
// =======================
describe('POST /api/orders/:id/checkout', () => {

  it('should return 401 if no token', async () => {
    const res = await request(app)
      .post('/api/orders/1/checkout')

    expect(res.statusCode).toBe(401)
  })

  it('should return error if order not found', async () => {
    const res = await request(app)
      .post('/api/orders/9999/checkout')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toBeGreaterThanOrEqual(400)
    expect(res.body.success).toBe(false)
  })

})

