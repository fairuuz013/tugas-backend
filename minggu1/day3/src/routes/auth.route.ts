import { Router } from "express";
import prisma from "../prisma";
import { AuthRepository } from "../repository/auth.repository";
import { AuthServices } from "../services/auth.service";
import { AuthController } from "../controller/auth.controller";

const router = Router();

const repo = new AuthRepository(prisma);
const service = new AuthServices(repo);
const controller = new AuthController(service);


/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Manajemen autentikasi pengguna
 */

router.post("/login", controller.login);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 *     responses:
 *       200:
 *         description: Login berhasil
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
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *                  
 *       401:
 *         description: Email atau password salah
*/


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Ucup
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 *               role:
 *                  type: string
 *                  example: ADMIN
 *     responses:
 *       200:
 *         description: Register berhasil
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
 *                   type: object
 *                   properties:
 *                      message:
 *                          type: string
 *                          example: Register sukses
 *                      token:
 *                          type: string
 *                          example: ey...
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *                  
 *       401:
 *         description: Email atau password salah
 */
router.post("/register", controller.register);

export default router;
