import express, { type Application, type NextFunction, type Request, type Response } from "express";
import dotenv from 'dotenv'
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors"
import {
    body,
    param,
    query,
    validationResult,
    type ValidationChain
} from 'express-validator';

dotenv.config()

const app: Application = express()
const HOST = process.env.HOST
const PORT = process.env.PORT




app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// 1



// 2

interface ApiResponse {
    success: boolean;
    message: string;
    data?: unknown;
    pagination?: {
        page: number;
        limit: number;
        total: number;
    };
    errors?: Array<{
        field: string;
        message: string;
    }> | { stack?: string };
}

// 4
const successResponse = (
    res: Response,
    message: string,
    data: unknown = null,
    pagination: { page: number; limit: number; total: number } | null = null,
    statusCode: number = 200
) => {
    const response: ApiResponse = {
        success: true,
        message,
    };
    if (data !== null) response.data = data;
  if (pagination) response.pagination = pagination;

  return res.status(statusCode).json(response);

}


// Error Response Helper 5
const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors: Array<{ field: string; message: string }> | { stack?: string } | null = null
) => {
  const response: ApiResponse = {
    success: false,
    message,
  };

  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};





// TUGAS DAY 4


// route 1 tugas day 4



// BUILD NYA 

const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// 8
app.get('/api/async', asyncHandler(async (_req: Request, res: Response) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    successResponse(res, "Async Berasil!", null);
}))

// 9



// 10
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('ERROR:', err.message);

    const statusCode = err.message.includes('tidak ditemukan') ? 404 : 400;

    errorResponse(res, err.message || 'Terjadi kesalahan server', statusCode,
        process.env.NODE_ENV === 'development' ? { stack: err.stack } as { stack?: string } : null
    );
});



app.listen(PORT, () => {
    console.log(`Server running at ${HOST}: ${PORT}`);
})