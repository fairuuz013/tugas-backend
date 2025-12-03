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


interface CustomRequest extends Request {
    startTime?: number
}


app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// 1
app.use((req: CustomRequest, _res: Response, next: NextFunction) => {
    console.log(`Request masuk: ${req.method} ${req.path}`)
    req.startTime = Date.now()
    next()
})


// 2
app.use((req: Request, res: Response, next: NextFunction) => {
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
});


interface Songs {
    id: number,
    nama: string,
    singer: string,
    release: number
}


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


// 6
const validate = (validations: ValidationChain[]) => {
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
const createProductValidation = [
  body('nama')
    .trim()
    .notEmpty().withMessage('Nama produk wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
  body('singer')
    .trim()
    .notEmpty().withMessage('Deskripsi wajib diisi'),
  
  body('release')
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
];

// Validasi untuk GET by ID produk
const getProductByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];



// TUGAS DAY 4
let songs: Songs[]  =  [
    { id: 1, nama: "odoriko", singer: "vaundy", release: 2023 },
    { id: 2, nama: "supernatural", singer: "newjeans", release: 2024 },
    { id: 3, nama: "birds of a feather", singer: "billieeilish", release: 2024 }
]


// route 1 tugas day 4

app.get('/', (_req: Request, res: Response) => {
    successResponse(
        res,
        "Welcome to songs api man",
        {
            hari: 4,
            status: "Server Hidup"

        }
    )
})



// route 2
app.get('/api/songs', (_req: Request, res: Response) => {
    successResponse(
        res,
        "Found song",
        songs
    )
})


// route 3
app.get('/api/songs/:id', validate(getProductByIdValidation), (req: Request, res: Response) => {
    if(!req.params.id) {
    throw new Error, "Parameter nya ngga ada wok"
    }

    const id = parseInt  (req.params.id)
    const song = songs.find(s => s.id === id);

    if (!song) {
        throw new Error ("Lagu tidak di temukan")
    }

    successResponse(
        res, "Mantap lagu nya ketemu",
        song
    )
})


// tugas 4
app.get('/api/search', (req: Request, res: Response) => {
    const { name, sig } = req.query

    let result = songs;

    if (name) {
        result = result.filter(s =>
            s.nama.toLowerCase().includes((name as string).toLowerCase())
        )
    }
    if (sig) {
        result = result.filter(s =>
            s.singer.toLowerCase().trim() === String(sig).toLowerCase().trim()
        );

    }

    res.json({
        success: true,
        filtered_result: result
    });
})

// tugas 5
app.post('/api/songs', validate(createProductValidation), (req: Request, res: Response) => {
    const { nama, singer, release } = req.body;

    const newSong = {
        id: songs.length + 1,
        nama,
        singer,
        release
    };
    songs.push(newSong);

    successResponse(
        res,
        "Produk berasil di tambah",
        songs,
        null,
        201
    )
});


//soal 6

app.put('/api/songs/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const index = songs.findIndex(s => s.id === id);

    if (index === -1) {
        throw new Error, "Gagal update"
    }

    songs[index] = { ...songs[index], ...req.body };


  successResponse(
    res, 
    "update song",
    songs
  )
});



// tugas nomer 7

app.delete('/api/songs/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const index = songs.findIndex(s => s.id === id);


    if (index === -1) {
        return res.status(404).json({ success: false, message: "lagu tidak ada " });
    }
    const deleted = songs.splice(index, 1)
    res.json({
        success: true,
        message: "lagu berhasil dihapus",
        data: deleted[0]
    });
});


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
app.get(/.*/, (req: Request, _res: Response) => {
    throw new Error(`Route ${req.originalUrl} tidak ada api songs `)
})


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