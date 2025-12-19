import type { Prisma } from "../generated/client"
import { getPrisma } from "../prisma"

const prisma = getPrisma()

export async function list(
  skip: number,
  take: number,
  where: Prisma.OrdersWhereInput,
  orderBy: Prisma.OrdersOrderByWithRelationInput
) {
  return prisma.orders.findMany({
    skip,
    take,
    where,
    orderBy,
    include: {
      orderItems: true
    }
  })
}

export async function countAll(where: Prisma.OrdersWhereInput) {
  return prisma.orders.count({ where })
}

export async function findById(id: number) {
  return prisma.orders.findUnique({
    where: { id },
    include: { orderItems: true }
  })
}

export async function create(data: Prisma.OrdersCreateInput) {
  return prisma.orders.create({
    data,
    include: { orderItems: true }
  })
}
