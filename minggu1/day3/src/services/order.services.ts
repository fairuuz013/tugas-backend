import type { Prisma, Orders } from "../generated/client";
import type { IOrderRepository } from "../repository/order.repository";
import type { IProductRepository } from "../repository/product.repository";


type OrderWithItems = Prisma.OrdersGetPayload<{
  include: {
    orderItems: {
      include: {
        product: true;
      };
    };
  };
}>;

/* =====================
   PARAMS & RESPONSE
===================== */

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    userId?: number;
    status?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface OrderListResponse {
  orders: Orders[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/* =====================
   SERVICE INTERFACE
===================== */

export interface IOrderService {
  list(params: FindAllParams): Promise<OrderListResponse>;
  getById(id: string): Promise<Orders | null>;
  createOrders(data: { userId: number }): Promise<Orders>;
  update(id: string, data: Prisma.OrdersUpdateInput): Promise<Orders>;
  delete(id: string): Promise<Orders>;
  checkout(orderId: string): Promise<Orders>;
  execStats(): Promise<{ overview: any; byUser: any }>;
  findComplex(userId: string, minTotal: number): Promise<Orders[]>;
}

/* =====================
   SERVICE IMPLEMENTATION
===================== */

export class OrderServices implements IOrderService {
  constructor(
    private orderRepo: IOrderRepository,
    private productRepo: IProductRepository
  ) { };

  // ROUTE 1 - LIST
  async list(params: FindAllParams): Promise<OrderListResponse> {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const whereClause: Prisma.OrdersWhereInput = {
      deletedAt: null,
    };

    if (search?.userId) whereClause.userId = search.userId;

    const sortCriteria: Prisma.OrdersOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { createdAt: "desc" };

    const orders = await this.orderRepo.list(
      skip,
      limit,
      whereClause,
      sortCriteria
    );

    const total = await this.orderRepo.countAll(whereClause);

    return {
      orders,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  // ROUTE 2 - GET BY ID
  async getById(id: string): Promise<Orders | null> {
    const numId = parseInt(id);

    const order = await this.orderRepo.findById(numId);

    if (!order || order.deletedAt !== null) {
      throw new Error("Orders tidak ditemukan");
    }

    return order;
  }

  // ROUTE 4 - CREATE
  async createOrders(data: { userId: number }): Promise<Orders> {
  return await this.orderRepo.create({
    user: {
      connect: { id: data.userId }
    },
    total: 0,
    status: "PENDING",
  });
}


  // ROUTE 5 - UPDATE
  async update(id: string, data: Prisma.OrdersUpdateInput): Promise<Orders> {
    const numId = parseInt(id);
    return await this.orderRepo.update(numId, data);
  }

  // ROUTE 6 - DELETE (SOFT)
  async delete(id: string): Promise<Orders> {
    const numId = parseInt(id);

    const order = await this.orderRepo.findById(numId);

    if (!order || order.deletedAt !== null) {
      throw new Error("Orders tidak ditemukan atau sudah dihapus");
    }

    return await this.orderRepo.softDelete(numId);
  }


  // ROUTE 7 CHECKOUT 

  async checkout(orderId: string): Promise<Orders> {
    const id = parseInt(orderId);

    const order = await this.orderRepo.findById(id) as OrderWithItems;

    if (!order || order.deletedAt !== null) {
      throw new Error("Order tidak ditemukan");
    }

    if (order.status !== "PENDING") {
      throw new Error("Order sudah di checkout");
    }

    // VALIDASI STOCK
    for (const item of order.orderItems) {
      if (item.product.stock < item.quantity) {
        throw new Error(
          `Stock produk ${item.product.name} tidak cukup`
        );
      }
    }

    // KURANGI STOCK
    for (const item of order.orderItems) {
      await this.productRepo.update(item.productId, {
        stock: item.product.stock - item.quantity,
      });
    }

    // UPDATE STATUS
    return await this.orderRepo.update(id, {
      status: "PAID",
    });
  }
  
  async execStats(){
    const overview = await this.orderRepo.getStats();
    const byUser = await this.orderRepo.getOrdersByUserStats();

    return {
      overview,
      byUser
    }    
  }



  async findComplex(userId: string, minTotal: number): Promise<Orders[]> {
    const uid = parseInt(userId);

    if (isNaN(uid)) {
      throw new Error ("User tidak valid");
    }

    return await this.orderRepo.findComplex(uid, minTotal)
  }

  


}
