import express, { type Application, type Request, type Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors"
import productRouter from './routes/product.route'
import songRouter from './routes/song.route'
import { errorHandler } from "./middleware/error.handler";
import { successResponse } from "./utils/response";
import { apiKey, logging } from "./middleware/product.validasion";



const app: Application = express()



app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
 

// 1
app.use (logging)

// 2
app.use(apiKey)




app.get('/', (_req: Request, res: Response) => {
    successResponse(
        res,
        "Selamat datang di API E-Commerce",
        {
            hari: 4,
            status: "Server Hidup"
        }
    )
})
app.use ('/api/songs', songRouter)
app.use('/api/products', productRouter)

// 9
app.get(/.*/, (req: Request, _res: Response) => {
    throw new Error(`Route ${req.originalUrl} Tidak ada api E-Commerce`)
})

app.use(errorHandler)





export default app