import type { Prisma, Product } from "../generated/client"
import * as productRepo from '../repository/product.repository'
import { getOrderById } from "./order.services";

interface FindAllParams {
    page: number,
    limit: number,
    search?: {
        name?: string,
        min_price?: number,
        max_price?: number
    }
    sortBy?: string,
    sortOrder?: 'asc' | 'desc';
}


interface ProductListResponse {
    products: Product[],
    total: number,
    totalPages: number,
    currentPage: number,
}

// ROUTE PRODUCT 
// ROUTE 1
export const getAllProducts = async (params: FindAllParams): Promise<ProductListResponse> => {
    const { page, limit, search, sortBy, sortOrder } = params

    const skip = (page - 1) * limit

    const whereClause: Prisma.ProductWhereInput = { deletedAt: null }

    if (search?.name) whereClause.name = { contains: search.name, mode: 'insensitive' }
    if (search?.min_price) whereClause.price = { gte: search.min_price }
    if (search?.max_price) whereClause.price = { lte: search.max_price }

    const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy
        ? { [sortBy]: sortOrder || 'desc' }
        : { createdAt: 'desc' }

    const products = await productRepo.list(skip, limit, whereClause, sortCriteria)

    const total = await productRepo.countAll(whereClause)

    return {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    }
}




// ROUTE 2
export const getProductById = async (id: string) => {
    const numId = parseInt(id);


    const product = await productRepo.findById(numId)

    // manual filter soft delete
    if (!product || product.deletedAt !== null) {
        throw new Error("Product tidak di temukan");
    }

    return product;
}


// ROUTE 4
export const createProduct = async (data: { name: string, description?: string, price: number, stock: number, categoryId?: number, image: string }): Promise<Product> => {
    return await productRepo.create(data)
}



// ROUTE 5
export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    await getOrderById(id)

    const numId = parseInt(id);

    return await productRepo.update(numId, data);
};


// ROUTE 6
export const deleteProduct = async (id: string): Promise<Product> => {
    const numId = parseInt(id);

    const product = await productRepo.findById(numId)

    if (!product || product.deletedAt !== null) {
        throw new Error("Product tidak ditemukan atau sudah dihapus");
    }

    // Baru update
    return await productRepo.softDelete(numId)
};