import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/product.controller";
import { createProductValidation, getProductByIdValidation, validate } from "../middleware/product.validasion";


const router = Router()


// route 1 


// route 2 
router.get('/', getAll)

// route ke 3 
router.get('/search',search );

// route 4
router.get('/:id', validate(getProductByIdValidation), getById );



// route ke 5 men 
router.post('/', validate(createProductValidation), create );


// route ke 6

router.put('/:id', update);



// 7. ROUTE DELETE – Hapus produk
router.delete('/:id', remove);


export default router
