import type { OrderItems } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma()

// 1. GET ALL
export const getAllOrderItems = async (): Promise<OrderItems[]> => {
    return await prisma.orderItems.findMany({
        where: { deletedAt: null },
        include: { product: true, order: true }
    });
};


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

    return await prisma.orderItems.create({
        data: {
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity
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
