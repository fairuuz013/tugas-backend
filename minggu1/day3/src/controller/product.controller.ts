import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { errorResponse } from "../utils/response"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, } from "../services/product.services"
import { searchProduct } from "../services/product.services"



// 1
export const getAll = async (_req: Request, res: Response) => {
    const { products, total } = await getAllProducts()
    successResponse(
        res,
        "anjay berasil",
        {
            jumlah: total,
            data: products
        }
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

//3
export const search = async (req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    const result = await searchProduct(name?.toString(), Number(max_price), Number(min_price))

    successResponse(
        res,
        "Produk berhasil diambil",
        result
    )
}

//4
export const create = async (req: Request, res: Response) => {
    const { name, description, price, stock, categoryId } = req.body
    const data = {
        name: String(name),
        description: String(description), 
        price: Number(price),
        stock: Number(stock),
        categoris: Number(categoryId),
        ...(description && { description: description})
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