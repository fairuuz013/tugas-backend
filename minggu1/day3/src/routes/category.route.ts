import { Router } from "express";
import  * as category from "../controller/category.controller"
import { validate } from "../utils/validator";
import { createCategoryValidation, getCategoryByIdValidation } from "../middleware/category.validasion";

const router = Router()

router.get("/", category.getAll)

router.get("/search", category.search);

router.get("/:id", validate(getCategoryByIdValidation), category.getById);

router.post("/", validate(createCategoryValidation), category.create)

router.put("/:id", category.update)

router.delete('/:id', category.remove);

export default router