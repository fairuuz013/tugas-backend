import { Router } from "express";
import prisma from "../prisma";
import { AuthRepository } from "../repository/auth.repository";
import { AuthServices } from "../services/auth.service";
import { AuthController } from "../controller/auth.controller";

const router = Router();

const repo = new AuthRepository(prisma);
const service = new AuthServices(repo);
const controller = new AuthController(service);

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
