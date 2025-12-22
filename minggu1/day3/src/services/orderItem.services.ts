import type {
  Prisma,
  OrderItems,
} from "../generated/client";
import type { IOrderItemRepository } from "../repository/orderItem.repository";

/* =====================
   PARAMS & RESPONSE
===================== */

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    orderId?: number;
    productId?: number;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface OrderItemListResponse {
  items: OrderItems[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/* =====================
   SERVICE INTERFACE
===================== */

export interface IOrderItemService {
  list(params: FindAllParams): Promise<OrderItemListResponse>;
  getById(id: string): Promise<OrderItems>;
  create(data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;
  update(
    id: string,
    data: Prisma.OrderItemsUpdateInput
  ): Promise<OrderItems>;
  delete(id: string): Promise<OrderItems>;
}

/* =====================
   SERVICE IMPLEMENTATION
===================== */

export class OrderItemServices implements IOrderItemService {
  constructor(private orderItemRepo: IOrderItemRepository) {}

  // ROUTE 1 - LIST
  async list(
    params: FindAllParams
  ): Promise<OrderItemListResponse> {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const whereClause: Prisma.OrderItemsWhereInput = {
      deletedAt: null,
    };

    if (search?.orderId) whereClause.orderId = search.orderId;
    if (search?.productId)
      whereClause.productId = search.productId;

    const sortCriteria: Prisma.OrderItemsOrderByWithRelationInput =
      sortBy
        ? { [sortBy]: sortOrder || "desc" }
        : { createdAt: "desc" };

    const items = await this.orderItemRepo.list(
      skip,
      limit,
      whereClause,
      sortCriteria
    );

    const total = await this.orderItemRepo.countAll(whereClause);

    return {
      items,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  // ROUTE 2 - GET BY ID
  async getById(id: string): Promise<OrderItems> {
    const numId = parseInt(id);

    const item = await this.orderItemRepo.findById(numId);

    if (!item || item.deletedAt !== null) {
      throw new Error("Order item tidak ditemukan");
    }

    return item;
  }

  // ROUTE 3 - CREATE
  async create(
    data: Prisma.OrderItemsCreateInput
  ): Promise<OrderItems> {
    return await this.orderItemRepo.create(data);
  }

  // ROUTE 4 - UPDATE
  async update(
    id: string,
    data: Prisma.OrderItemsUpdateInput
  ): Promise<OrderItems> {
    const numId = parseInt(id);
    return await this.orderItemRepo.update(numId, data);
  }

  // ROUTE 5 - DELETE
  async delete(id: string): Promise<OrderItems> {
    const numId = parseInt(id);

    const item = await this.orderItemRepo.findById(numId);

    if (!item || item.deletedAt !== null) {
      throw new Error(
        "Order item tidak ditemukan atau sudah dihapus"
      );
    }

    return await this.orderItemRepo.softDelete(numId);
  }
}
