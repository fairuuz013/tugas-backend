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
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// Routes tambahan
router.get("/find/complex", controller.findComplex); // ?name=&maxPrice=
router.get("/overview", controller.getOverview);

export default router;
