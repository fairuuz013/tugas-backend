import { Router } from "express";
import prismaInstance from "../prisma";
import { OrderItemRepository } from "../repository/orderItem.repository";
import { OrderItemServices } from "../services/orderItem.services";
import { OrderItemController } from "../controller/orderItem.controller";

const router = Router();

const repo = new OrderItemRepository(prismaInstance);
const service = new OrderItemServices(repo);
const controller = new OrderItemController(service);
/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Manajemen item dalam order
 */

/**
 * @swagger
 * /ordersItem:
 *   get:
 *     summary: Get all order items (pagination)
 *     tags: [OrderItems]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: integer
 *         description: Filter by order ID
 *       - in: query
 *         name: productId
 *         schema:
 *           type: integer
 *         description: Filter by product ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: desc
 *     responses:
 *       200:
 *         description: Order items berhasil diambil
 */
router.get("/", controller.list.bind(controller));

/**
 * @swagger
 * /ordersItem/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item ditemukan
 *       404:
 *         description: Order item tidak ditemukan
 */
router.get("/:id", controller.getById.bind(controller));

/**
 * @swagger
 * /ordersItem:
 *   post:
 *     summary: Create order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - quantity
 *               - priceAtTime
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 10
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               priceAtTime:
 *                 type: number
 *                 example: 150000
 *     responses:
 *       201:
 *         description: Order item berhasil dibuat
 */
router.post("/", controller.create.bind(controller));

/**
 * @swagger
 * /ordersItem/{id}:
 *   put:
 *     summary: Update order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               priceAtTime:
 *                 type: number
 *                 example: 140000
 *     responses:
 *       200:
 *         description: Order item berhasil diupdate
 *       404:
 *         description: Order item tidak ditemukan
 */
router.put("/:id", controller.update.bind(controller));

/**
 * @swagger
 * /ordersItem/{id}:
 *   delete:
 *     summary: Delete order item (soft delete)
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item berhasil dihapus
 *       404:
 *         description: Order item tidak ditemukan
 */
router.delete("/:id", controller.remove.bind(controller));


export default router;
