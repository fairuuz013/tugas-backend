 import type { NextFunction, Request, Response } from "express";
 import { body, param } from "express-validator";



// Validasi untuk CREATE & UPDATE produk
export const createProductValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama produk wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),

    body('description')
        .trim()
        .notEmpty().withMessage('Deskripsi wajib diisi'),

    body('price')
        .isNumeric().withMessage('Harga harus angka') 
        .custom(value => value > 0).withMessage('Harga harus lebih dari 0'),


    body('stock')
        .isNumeric().withMessage('Stock harus angka')
        .custom(value => value > 0).withMessage('Stock harus lebih dari 0'),

    body('categoryId')
        .isNumeric().withMessage('Stock harus angka')
        .custom(value => value > 0).withMessage('Stock harus lebih dari 1'),

    ];

// Validasi untuk GET by ID produk
export const getProductByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];




export const logging = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`Request masuk: ${req.method} ${req.path}`)
    req.startTime = Date.now();
    next()
}