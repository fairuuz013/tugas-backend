import type { Order } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma()


export const getAllOrder = async (): Promise<{ orders: Order[], total: number }> => {
    const orders = await prisma.order.findMany(
        {
            include: { orderItems: true },
            where: {
                deletedAt: null
            }

        })

    const total = orders.length
    return { orders, total }
}




export const getOrderById = async (id: string) => {
    const numId = parseInt(id);

    const order = await prisma.order.findUnique({
        where: { id: numId },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    // manual soft delete check
    if (!order || order.deletedAt !== null) {
        throw new Error("Order tidak ditemukan");
    }

    return order;
};




export const searchOrder = async (
    userId?: number,
    min_total?: number,
    max_total?: number
): Promise<Order[]> => {
    return await prisma.order.findMany({
        where: {
            deletedAt: null,

            ...(userId && { userId }),

            ...(min_total || max_total
                ? {
                    total: {
                        ...(min_total && { gte: min_total }),
                        ...(max_total && { lte: max_total }),
                    }
                }
                : {})
        },
        include: {
            orderItems: {
                include: { product: true }
            }
        }
    });
};



export const createOrder = async (data: {
    userId: number,
    items: {
        productId: number,
        quantity: number
    }[]
}) => {
    // hitung total
    const total = await Promise.all(
        data.items.map(async (item) => {
            const product = await prisma.product.findUnique({
                where: { id: item.productId }
            });

            if (!product) throw new Error("Produk tidak ditemukan");

            return Number(product.price) * item.quantity;
        })
    ).then(values => values.reduce((a, b) => a + b, 0));

    return await prisma.order.create({
        data: {
            userId: data.userId,
            total,
            orderItems: {
                create: data.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            }
        }
    });
};




export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
    const numId = parseInt(id);

    return await prisma.order.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data
    });
};





export const deleteOrder = async (id: string): Promise<Order> => {
    const numId = parseInt(id);

    return await prisma.order.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    });
};



export interface CreateOrder {
    userId: number

    orderItems: OrderItems[]

}

export interface OrderItems {
    orderId: number
    productId: number
    quantity: number
}


export const checkoutOrder = async (data: CreateOrder) => {
    return await prisma.$transaction(async (tx) => {
        let total = 0
        const orderItemsData = []

        // 1. Loop orderItems → ambil product asli
        for (const item of data.orderItems) {
            const product = await tx.product.findUnique({
                where: { id: item.productId }
            })

            if (!product) {
                throw new Error(`Product ID ${item.productId} not found`)
            }

            // 2. Validasi stok
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.name}`)
            }

            // 3. Hitung total dari harga DB
            const price = Number(product.price)
            total += price * item.quantity

            // 4. Siapkan data orderItems
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
            })

            // 5. Update stok
            await tx.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            })
        }

        // 6. Create order + orderItems (nested write)
        const newOrder = await tx.order.create({
            data: {
                userId: data.userId,
                total,
                orderItems: {
                    create: orderItemsData
                }
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return newOrder
    })
}
