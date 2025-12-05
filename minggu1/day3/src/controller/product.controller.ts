import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { errorResponse } from "../utils/response"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, } from "../services/product.services"
import { searchProduct } from "../services/product.services"



// 1
export const getAll = (_req: Request, res: Response) => {
    const { products, total } = getAllProducts()
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
export const getById = (req: Request, res: Response) => {
    if (!req.params.id) {
        return errorResponse(
            res,
            "Parameter ngga ada wok"
        )
    }
    const product = getProductById(req.params.id)

    successResponse(
        res, "Product berhasil di ambil product",
        
        product
    )
}

//3
export const search = (req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    const result = searchProduct(name?.toString
        (), max_price?.toString(), min_price?.
            toString())

    successResponse(
        res,
        "Produk berhasil diambil",
        result
    )
}

//4
export const create = (req: Request, res: Response) => {
    const { nama, deskripsi, harga } = req.body


    const products = createProduct(nama,
        deskripsi, harga)

    successResponse(
        res,
        "Produk berasil di tambah",
        products,
        null,
        201
    )
}

//5
export const update = (req: Request, res: Response) => {
    const product = updateProduct(req.
        params.id!, req.body)

    successResponse(
        res,
        "product berasil di update",
        product
    )

}

//6
export const remove = (req: Request, res: Response) => {
    const deleted = deleteProduct(req.params.id!)

    successResponse(
        res,
        "Produk berhasil dihapus",
        deleted
    )
}