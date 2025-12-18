import type { OrderItems } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma()


interface FindAllOrderItemsParams {
    page: number
    limit: number
}



interface OderItemsListResponse {
    orderItems: OrderItems[]
    total: number
    totalPages: number
    currentPage: number
}






// 1. GET ALL
export const getAllOrderItems = async (
    params: FindAllOrderItemsParams
): Promise<OderItemsListResponse> => {

    const { page, limit } = params
    const skip = (page - 1) * limit

    const whereClause = { deletedAt: null }

    const orderItems = await prisma.orderItems.findMany({
        skip,
        take: limit,
        where: whereClause,
        include: { product: true, order: true },
        orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.orderItems.count({
        where: whereClause
    })

    return {
        orderItems,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
    }
}


// 2. GET BY ID
export const getOrderItemById = async (id: number): Promise<OrderItems> => {
    const item = await prisma.orderItems.findUnique({
        where: { id },
        include: { product: true }
    });

    if (!item || item.deletedAt !== null) {
        throw new Error("OrderItem tidak ditemukan");
    }

    return item;
};


// 3. SEARCH ORDER ITEM (opsional)
export const searchOrderItem = async (orderId?: number, productId?: number): Promise<OrderItems[]> => {
    return await prisma.orderItems.findMany({
        where: {
            deletedAt: null,
            ...(orderId && { orderId }),
            ...(productId && { productId })
        },
        include: { product: true }
    });
};


// 4. CREATE
export const createOrderItem = async (data: {
    orderId: number;
    productId: number;
    quantity: number;
}): Promise<OrderItems> => {

    const product = await prisma.product.findUnique({
        where: { id: data.productId }
    });

    if (!product) {
        throw new Error("Produk tidak ditemukan");
    }

    return await prisma.orderItems.create({
        data: {
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity,
            priceAtTime: product.price
        }
    });
};


// 5. UPDATE (biasanya update quantity doang)
export const updateOrderItem = async (
    id: number,
    data: Partial<OrderItems>
): Promise<OrderItems> => {
    return await prisma.orderItems.update({
        where: { id },
        data
    });
};


// 6. SOFT DELETE
export const deleteOrderItem = async (id: number): Promise<OrderItems> => {
    return await prisma.orderItems.update({
        where: { id },
        data: { deletedAt: new Date() }
    });
};
