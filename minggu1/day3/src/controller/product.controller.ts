import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { type IProductService } from "../services/product.services"

export interface IProductController {
    list(req: Request, res: Response): Promise<void>
    getById(req: Request, res: Response): Promise<void>
    create(req: Request, res: Response): Promise<void>
    update(req: Request, res: Response): Promise<void>
    remove(req: Request, res: Response): Promise<void>
    getStats(_req: Request, res: Response): Promise<void>
}

export class productController implements IProductController {
    constructor(private productService: IProductService) {
        this.list = this.list.bind(this)
        this.getById = this.getById.bind(this)
        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.getStats = this.getStats.bind(this)
     }

    // 1
     async list  (req: Request, res: Response) {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search as any
        const sortBy = req.query.sortBy as string
        const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc'
    
    
        const result = await this.productService.list({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        })
    
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages,
        }
    
        successResponse(
            res,
            "Produk berasil diambil",
            result.products,
            pagination,
        )
    }
    
    //2
    async getById (req: Request, res: Response) {
        const product = await this.productService.getById(req.params.id!)
    
        successResponse(
            res,
             "Product berhasil di ambil product",
            product,
            null,
            200
        )
    }
    
    
    async create  (req: Request, res: Response)  {
        const file = req.file
        if (!file) throw new Error(" image is required")
        const { name, description, price, stock, categoryId } = req.body
        const imageUrl = `/public/uploads/${file.filename}`;
    
        const data = {
            name: String(name),
            description: String(description),
            price: Number(price),
            stock: Number(stock),
            categoryId: Number(categoryId),
            ...(description && { description: description }),
            image: imageUrl,
        }
    
    
        const products = await this.productService.create(data)
    
        successResponse(
            res,
            "Produk berasil di tambah",
            products,
            null,
            201
        )
    }
    
    //5
    async   update  (req: Request, res: Response) {
        const product = await this.productService.update(req.params.id!, req.body)
    
        successResponse(
            res,
            "product berasil di update",
            product,
            null,
            200
        )
    
    }

    //6
     async remove  (req: Request, res: Response)  {
        const deleted = await this.productService.delete(req.params.id!)
    
        successResponse(
            res,
            "Produk berhasil dihapus",
            deleted,
            null, 
            200
        )
    }

    async getStats (_req: Request, res: Response) {
        const stats = await this.productService.exec()
        successResponse(
            res,
            "Stastistik product berhasil diambil",
            stats,
            null,
            200
        )
    }

}