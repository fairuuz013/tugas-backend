 import type { NextFunction, Request, Response } from "express";
 import { body, param, validationResult, type ValidationChain } from "express-validator";
 import { errorResponse } from "../utils/response";


// 6
export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const errorList = errors.array().map(err => ({
            field: err.type === 'field' ? err.path : 'unknown',
            message: err.msg
        }));

        return errorResponse(res, 'Validasi gagal', 400, errorList);
    };
};

// Validasi untuk CREATE & UPDATE produk
export const createProductValidation = [
    body('nama')
        .trim()
        .notEmpty().withMessage('Nama produk wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),

    body('deskripsi')
        .trim()
        .notEmpty().withMessage('Deskripsi wajib diisi'),

    body('harga')
        .isNumeric().withMessage('Harga harus angka')
        .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
];

// Validasi untuk GET by ID produk
export const getProductByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];



export const apiKey =(req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "Header X-API-Key wajib diisi untuk akses API!"
        });
    }
    if (apiKey !== 'katasandi123') {
        return res.status(403).json({
            success: false,
            message: "API Key tidak valid!"
        });
    }
    next();
};

export const logging = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`Request masuk: ${req.method} ${req.path}`)
    req.startTime = Date.now();
    next()
}