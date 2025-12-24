import { Router } from "express";
import prismaInstance from "../prisma";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryServices } from "../services/category.services";
import { CategoryController } from "../controller/category.controller";

const router = Router();

const repo = new CategoryRepository(prismaInstance);
const service = new CategoryServices(repo);
const controller = new CategoryController(service);

// Routes CRUD
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Manajemen data category
 */

router.get("/", controller.list);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Ambil daftar category (pagination)
 *     tags: [Category]
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
 *         description: Categories berhasil diambil
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
 *                       type: number
 *                     limit:
 *                       type: number
 *                     total:
 *                       type: number
 *                     totalPages:
 *                       type: number
 */




router.get("/:id", controller.getById);
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Ambil category berdasarkan ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category ditemukan
 *       404:
 *         description: Category tidak ditemukan
 */


router.post("/", controller.create);
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Membuat category baru
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elektronik
 *     responses:
 *       201:
 *         description: Category berhasil dibuat
 */



router.put("/:id", controller.update);
/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elektronik Update
 *     responses:
 *       200:
 *         description: Category berhasil diperbarui
 */


router.delete("/:id", controller.remove);
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Hapus category (soft delete)
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category berhasil dihapus
 */

// Routes tambahan
router.get("/find/complex", controller.findComplex); // ?name=&maxPrice=
/**
 * @swagger
 * /category/find/complex:
 *   get:
 *     summary: Cari category berdasarkan nama atau harga product
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: makanan
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           example: 10000
 *     responses:
 *       200:
 *         description: Categories kompleks berhasil diambil
 *       400:
 *         description: Minimal salah satu parameter harus diisi
 */



export default router;
