import express, { type Application, type Request, type Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors"
import productRouter from './routes/product.route'
import categoryRouter from './routes/category.route'
import orderRouter from './routes/order.route'
import orderItemRouter from './routes/orderItem.route'
import authRouter from './routes/auth.route'
import profileRoute from "./routes/profile.route";
import { errorHandler } from "./middleware/error.handler";
import { successResponse } from "./utils/response";
import swaggerSpec from "./utils/swagger";
import  swaggerUi  from "swagger-ui-express";





const app: Application = express()



app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.set('query parser', 'extended')
app.use(express.static("public"))
 


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// 1

app.get('/', (_req, res) => {
  res.redirect('/api-docs');
});



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
app.use("/profiles", profileRoute);
app.use('/api/auth', authRouter)
app.use('/api/ordersItem',orderItemRouter )
app.use('/api/orders',orderRouter )
app.use('/api/category', categoryRouter)
app.use('/api/products', productRouter)

// 9
app.get(/.*/, (req: Request, _res: Response) => {
    throw new Error(`Route ${req.originalUrl} Tidak ada api E-Commerce`)
})

app.use(errorHandler)





export default app