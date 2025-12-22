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

router.get("/me", authenticate, controller.me.bind(controller));
router.post("/", authenticate, controller.create.bind(controller));
router.put("/", authenticate, controller.update.bind(controller));

export default router;
