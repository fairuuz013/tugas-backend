import { Router } from "express";
import { productController } from "../controller/product.controller";
import { createProductValidation, getProductByIdValidation,} from "../middleware/product.validasion";
import { validate } from "../utils/validator";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { ProductRepository } from "../repository/product.repository";
import { ProductServices } from "../services/product.services";
import prismaInstance from "../prisma";


const router = Router()



export const repo = new ProductRepository(prismaInstance)
const services = new ProductServices(repo)
const controller = new productController(services)

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search product by name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: price
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: desc
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get('/', controller.list)

/**
 * @swagger
 * /products/stats:
 *   get:
 *     summary: Get product statistics
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product statistics retrieved
 */
router.get('/stats', controller.getStats)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', validate(getProductByIdValidation), controller.getById)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  authenticate,
  upload.single("image"),
  validate(createProductValidation),
  controller.create
)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put('/:id', controller.update)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product (soft delete)
 *     tags: [Products]
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
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', controller.remove)


export default router
