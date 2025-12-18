import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { errorResponse } from "../utils/response"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, } from "../services/product.services"




// 1
export const getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc'


    const result = await getAllProducts({
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
        pagination
    )
}

//2
export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return errorResponse(
            res,
            "Parameter ngga ada wok"
        )
    }
    const product = await getProductById(req.params.id)

    successResponse(
        res, "Product berhasil di ambil product",

        product
    )
}

// //3
// export const search = async (req: Request, res: Response) => {
//     const { name, max_price, min_price } = req.query;

//     const result = await searchProduct(name?.toString(), Number(max_price), Number(min_price))

//     successResponse(
//         res,
//         "Produk berhasil diambil",
//         result
//     )
// }

//4
export const create = async (req: Request, res: Response) => {
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


    const products = await createProduct(data)

    successResponse(
        res,
        "Produk berasil di tambah",
        products,
        null,
        201
    )
}

//5
export const update = async (req: Request, res: Response) => {
    const product = await updateProduct(req.params.id!, req.body)

    successResponse(
        res,
        "product berasil di update",
        product
    )

}

//6
export const remove = async (req: Request, res: Response) => {
    const deleted = await deleteProduct(req.params.id!)

    successResponse(
        res,
        "Produk berhasil dihapus",
        deleted
    )
}