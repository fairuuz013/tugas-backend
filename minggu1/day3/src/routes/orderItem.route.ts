import { Router } from "express";
import prismaInstance from "../prisma";
import { OrderItemRepository } from "../repository/orderItem.repository";
import { OrderItemServices } from "../services/orderItem.services";
import { OrderItemController } from "../controller/orderItem.controller";

const router = Router();

const repo = new OrderItemRepository(prismaInstance);
const service = new OrderItemServices(repo);
const controller = new OrderItemController(service);

router.get("/", controller.list.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.remove.bind(controller));

export default router;
