import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/product.controller";
import { createProductValidation, getProductByIdValidation, validate } from "../middleware/product.validasion";


const router = Router()


// route 1 
router.get('/', getAll)

// route 2 
router.get('/api/products', getAll)

// route 3
router.get('/api/products/:id', validate(getProductByIdValidation), getById );

// route ke 4
router.get('/api/search',search );


// route ke 5 men 
router.post('/api/produts', validate(createProductValidation), create );


// route ke 6

router.put('/api/products/:id', update);



// 7. ROUTE DELETE – Hapus produk
router.delete('/api/products/:id', remove);


export default router
