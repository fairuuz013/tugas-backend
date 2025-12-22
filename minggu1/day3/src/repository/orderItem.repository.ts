import type {
  Prisma,
  PrismaClient,
  OrderItems,
} from "../generated/client";

export interface IOrderItemRepository {
  list(
    skip: number,
    take: number,
    where: Prisma.OrderItemsWhereInput,
    orderBy: Prisma.OrderItemsOrderByWithRelationInput
  ): Promise<OrderItems[]>;

  countAll(where: Prisma.OrderItemsWhereInput): Promise<number>;

  findById(id: number): Promise<OrderItems | null>;

  create(data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;

  update(
    id: number,
    data: Prisma.OrderItemsUpdateInput
  ): Promise<OrderItems>;

  softDelete(id: number): Promise<OrderItems>;
}

export class OrderItemRepository implements IOrderItemRepository {
  constructor(private prisma: PrismaClient) {}

  async list(
    skip: number,
    take: number,
    where: Prisma.OrderItemsWhereInput,
    orderBy: Prisma.OrderItemsOrderByWithRelationInput
  ): Promise<OrderItems[]> {
    return this.prisma.orderItems.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        product: true,
        order: true,
      },
    });
  }

  async countAll(where: Prisma.OrderItemsWhereInput): Promise<number> {
    return this.prisma.orderItems.count({ where });
  }

  async findById(id: number): Promise<OrderItems | null> {
    return this.prisma.orderItems.findUnique({
      where: { id, deletedAt: null },
      include: {
        product: true,
        order: true,
      },
    });
  }

  async create(
    data: Prisma.OrderItemsCreateInput
  ): Promise<OrderItems> {
    return this.prisma.orderItems.create({ data });
  }

  async update(
    id: number,
    data: Prisma.OrderItemsUpdateInput
  ): Promise<OrderItems> {
    return this.prisma.orderItems.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async softDelete(id: number): Promise<OrderItems> {
    return this.prisma.orderItems.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
