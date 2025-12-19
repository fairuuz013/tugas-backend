import type { Prisma } from "../generated/client"
import { getPrisma } from "../prisma"

const prisma = getPrisma()

export async function findByUserId(userId: number) {
  return prisma.profile.findUnique({
    where: { userId }
  })
}

export async function create(data: Prisma.ProfileCreateInput) {
  return prisma.profile.create({ data })
}

export async function update(
  userId: number,
  data: Prisma.ProfileUpdateInput
) {
  return prisma.profile.update({
    where: { userId },
    data
  })
}
