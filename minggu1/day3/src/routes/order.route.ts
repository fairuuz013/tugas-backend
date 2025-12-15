import { Router } from "express";
import * as OrderController from "../controller/order.controller";


const router = Router();

router.get("/", OrderController.getAll);
router.get("/search", OrderController.search);
router.get("/:id", OrderController.getById);
router.post("/checkout", OrderController.checkout)
router.post("/", OrderController.create);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.remove);

export default router;
