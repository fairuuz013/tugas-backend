import type { Prisma } from "../generated/client"
import { getPrisma } from "../prisma"

const prisma = getPrisma()

export async function list(
  skip: number,
  take: number,
  where: Prisma.CategoryWhereInput,
  orderBy: Prisma.CategoryOrderByWithRelationInput
) {
  return prisma.category.findMany({
    skip,
    take,
    where,
    orderBy
  })
}

export async function countAll(where: Prisma.CategoryWhereInput) {
  return prisma.category.count({ where })
}

export async function findById(id: number) {
  return prisma.category.findUnique({
    where: { id, deletedAt: null }
  })
}

export async function create(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({ data })
}

export async function update(id: number, data: Prisma.CategoryUpdateInput) {
  return prisma.category.update({
    where: { id, deletedAt: null },
    data
  })
}

export async function softDelete(id: number) {
  return prisma.category.update({
    where: { id },
    data: { deletedAt: new Date() }
  })
}
