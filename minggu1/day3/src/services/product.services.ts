import type { Product } from "../generated/client"
import { getPrisma } from "../prisma"

const prisma = getPrisma()




// ROUTE PRODUCT 
// ROUTE 1
export const getAllProducts = async (): Promise<{ products: Product[], total: number }> => {
    const products = await prisma.product.findMany(
        {
            include: { category: true },
            where: {
                deletedAt: null
            }
        })

    const total = products.length

    return { products, total }
}




// ROUTE 2
export const getProductById = async (id: string) => {
    const numId = parseInt(id);

    const product = await prisma.product.findUnique({
        where: { id: numId },
        include: { category: true }
    });

    // manual filter soft delete
    if (!product || product.deletedAt !== null) {
        throw new Error("Product tidak di temukan");
    }

    return product;
}

// ROUTE 3
export const searchProduct = async (
    name?: string,
    min_price?: number,
    max_price?: number
): Promise<Product[]> => {
    return await prisma.product.findMany({
        where: {
            deletedAt: null,

            ...(name && {
                name: {
                    contains: name,
                    mode: "insensitive",
                }
            }),

            ...(min_price || max_price
                ? {
                      price: {
                          ...(min_price && { gte: min_price }),
                          ...(max_price && { lte: max_price }),
                      }
                  }
                : {})
        },
        include: { category: true }
    });
};


// ROUTE 4
export const createProduct = async (data: { name: string, description?: string, price: number, stock: number, categoryId?: number }): Promise<Product> => {
    return await prisma.product.create

        ({
            data: {
                name: data.name,
                description: data.description ?? null,
                price: data.price,
                stock: data.stock,
                categoryId: data.categoryId ?? null,
            },
        })

}



// ROUTE 5
export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    const numId = parseInt(id);

    return await prisma.product.update({
        where: { 
            id: numId,
            deletedAt: null 
        },
        data
    });
};


// ROUTE 6
export const deleteProduct = async (id: string): Promise<Product> => {
    const numId = parseInt(id);

    // Cek dulu ada atau nggak + masih belum dihapus
    const product = await prisma.product.findUnique({
        where: { id: numId }
    });

    if (!product || product.deletedAt !== null) {
        throw new Error("Product tidak ditemukan atau sudah dihapus");
    }

    // Baru update
    return await prisma.product.update({
        where: { id: numId },
        data: { deletedAt: new Date() }
    });
};