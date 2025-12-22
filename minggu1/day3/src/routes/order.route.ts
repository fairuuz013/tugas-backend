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


router.get("/", orderController.list)
router.get("/:id", orderController.getById)
router.post("/", authenticate, orderController.create)
router.put("/:id", orderController.update)
router.delete("/:id", orderController.remove)

// 🔥 CHECKOUT
router.post("/:id/checkout", authenticate, orderController.checkout)

export default router
