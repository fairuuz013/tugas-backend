import { Router } from "express"
import { OrderController } from "../controller/order.controller"
import { OrderRepository } from "../repository/order.repository"
import { OrderServices } from "../services/order.services"
import prismaInstance from "../prisma"
import { authenticate } from "../middleware/auth.middleware"
import { repo as repoProduct } from "../routes/product.route"


const router = Router()

const repo = new OrderRepository(prismaInstance)
const service = new OrderServices(repo,repoProduct )
const orderController = new OrderController(service)

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Manajemen order dan checkout
 */


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Ambil daftar order (pagination)
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Daftar order berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get("/", orderController.list)


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Ambil detail order berdasarkan ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Order ditemukan
 *       404:
 *         description: Order tidak ditemukan
 */
router.get("/:id", orderController.getById)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Membuat order baru
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   connect:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *     responses:
 *       201:
 *         description: Order berhasil dibuat
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, orderController.create)



/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: PAID
 *     responses:
 *       200:
 *         description: Order berhasil diperbarui
 */
router.put("/:id", authenticate, orderController.update)


/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Hapus order (soft delete)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order berhasil dihapus
 *       404:
 *         description: Order tidak ditemukan
 */
router.delete("/:id", orderController.remove)



/**
 * @swagger
 * /orders/{id}/checkout:
 *   post:
 *     summary: Checkout order (ubah status & kurangi stock)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Checkout berhasil
 *       400:
 *         description: Order sudah di checkout atau stock tidak cukup
 *       401:
 *         description: Unauthorized
 */
router.post("/:id/checkout", authenticate, orderController.checkout)




/**
 * @swagger
 * /orders/orders/complex:
 *   get:
 *     summary: Cari order berdasarkan user dan minimal total
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: minTotal
 *         required: true
 *         schema:
 *           type: number
 *           example: 50000
 *     responses:
 *       200:
 *         description: Order kompleks berhasil diambil
 *       400:
 *         description: Parameter tidak valid
 */
router.get("/orders/complex", orderController.findComplex)



export default router
