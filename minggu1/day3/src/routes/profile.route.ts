import { Router } from "express";
import prismaInstance from "../prisma";
import { authenticate } from "../middleware/auth.middleware";
import { ProfileRepository } from "../repository/profile.repository";
import { ProfileServices } from "../services/profile.service";
import { ProfileController } from "../controller/profile.controller";

const router = Router();

const repo = new ProfileRepository(prismaInstance);
const service = new ProfileServices(repo);
const controller = new ProfileController(service);

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Manajemen profile user (JWT Required)
 */

/**
 * @swagger
 * /profiles/me:
 *   get:
 *     summary: Get profile user yang sedang login
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile ditemukan
 *       401:
 *         description: Token tidak valid
 *       404:
 *         description: Profile belum dibuat
 */
router.get("/me", authenticate, controller.me.bind(controller));

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create profile user (1 user hanya boleh 1 profile)
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Fairuuz Zahran
 *               phone:
 *                 type: string
 *                 example: "08123456789"
 *               address:
 *                 type: string
 *                 example: Bantul, Yogyakarta
 *     responses:
 *       201:
 *         description: Profile berhasil dibuat
 *       400:
 *         description: Profile sudah ada
 *       401:
 *         description: Token tidak valid
 */
router.post("/", authenticate, controller.create.bind(controller));

/**
 * @swagger
 * /profiles:
 *   put:
 *     summary: Update profile user yang sedang login
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Fairuuz Z
 *               phone:
 *                 type: string
 *                 example: "0899999999"
 *               address:
 *                 type: string
 *                 example: Sleman, Yogyakarta
 *     responses:
 *       200:
 *         description: Profile berhasil diupdate
 *       401:
 *         description: Token tidak valid
 *       404:
 *         description: Profile tidak ditemukan
 */
router.put("/", authenticate, controller.update.bind(controller));


export default router;
