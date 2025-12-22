import { Router } from "express";
import { productController } from "../controller/product.controller";
import { createProductValidation, getProductByIdValidation,} from "../middleware/product.validasion";
import { validate } from "../utils/validator";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { ProductRepository } from "../repository/product.repository";
import { ProductServices } from "../services/product.services";
import prismaInstance from "../prisma";


const router = Router()



export const repo = new ProductRepository(prismaInstance)
const services = new ProductServices(repo)
const controller = new productController(services)

router.get('/', controller.list)

router.get('/:id', validate(getProductByIdValidation), controller.getById );

router.post('/', authenticate , upload.single("image") , validate(createProductValidation), controller.create );

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);


export default router
