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
export  const createSongValidation = [
  body('nama')
    .trim()
    .notEmpty().withMessage('Nama music wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama music minimal 3 karakter'),
  
  body('singer')
    .trim()
    .notEmpty().withMessage('nama singer wajib diisi'),
  
  body('release')
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('harus sesuai tahun release')
];

// Validasi untuk GET by ID produk
export const getSongByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];



export const apiKeySong = (req: Request, res: Response, next: NextFunction) => {
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


export const loggingSong = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`Request masuk: ${req.method} ${req.path}`)
    req.startTime = Date.now()
    next()
}
