import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/product.controller";
import { createProductValidation, getProductByIdValidation,} from "../middleware/product.validasion";
import { validate } from "../utils/validator";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";


const router = Router()


// route 1 


// route 2 
router.get('/', getAll)

// route ke 3 
router.get('/search',search );

// route 4
router.get('/:id', validate(getProductByIdValidation), getById );



// route ke 5 men 
router.post('/', authenticate , upload.single("image") , validate(createProductValidation), create );


// route ke 6

router.put('/:id', update);



// 7. ROUTE DELETE – Hapus produk
router.delete('/:id', remove);


export default router
