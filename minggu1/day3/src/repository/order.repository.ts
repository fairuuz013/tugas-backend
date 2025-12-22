import type  { Prisma, PrismaClient, Orders } from "../generated/client";

export interface IOrderRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.OrdersWhereInput,
        orderBy: Prisma.OrdersOrderByWithRelationInput
    ): Promise<Orders[]>;
    countAll(where: Prisma.OrdersWhereInput): Promise<number>;
    findById(id: number): Promise<Orders | null>;
    create(data: Prisma.OrdersCreateInput): Promise<Orders>;
    update(id: number, data: Prisma.OrdersUpdateInput): Promise<Orders>;
    softDelete(id: number): Promise<Orders>;
}

export class OrderRepository implements IOrderRepository {
    constructor(private prisma: PrismaClient) {}

    async list(
        skip: number,
        take: number,
        where: Prisma.OrdersWhereInput,
        orderBy: Prisma.OrdersOrderByWithRelationInput
    ): Promise<Orders[]> {
        return await this.prisma.orders.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
                orderItems: true,
            },
        });
    }

    async countAll(where: Prisma.OrdersWhereInput): Promise<number> {
        return await this.prisma.orders.count({ where });
    }

    // FINDBYID
async findById(id: number) {
  return await this.prisma.orders.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
}

    // CREATE
    async create(data: Prisma.OrdersCreateInput): Promise<Orders> {
        return await this.prisma.orders.create({ data });
    }

    // UPDATE
    async update(id: number, data: Prisma.OrdersUpdateInput): Promise<Orders> {
        return await this.prisma.orders.update({
            where: {
                id,
                deletedAt: null,
            },
            data,
        });
    }

    // DELETE (SOFT)
    async softDelete(id: number): Promise<Orders> {
        return await this.prisma.orders.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
