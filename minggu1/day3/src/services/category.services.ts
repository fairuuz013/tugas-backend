import type { Category, Prisma } from "../generated/client"
import { getPrisma } from "../prisma"

import * as categoryRepo from "../repository/category.repository"

const prisma = getPrisma()


interface FindAllCategoryParams {
    page: number
    limit: number
}

interface CategoryListResponse {
    orderItems: Category[] 
    total: number
    totalPages: number
    currentPage: number

}



export const getAllCategory = async (
    params: FindAllCategoryParams
): Promise<CategoryListResponse> => {

    const { page, limit } = params
    const skip = (page - 1) * limit

    const whereClause: Prisma.CategoryWhereInput = {
        deletedAt: null
    }

    const categories = await categoryRepo.list(
        skip,
        limit,
        whereClause,
        { createdAt: "desc" }
    )

    const total = await categoryRepo.countAll(whereClause)

    return {
        orderItems: categories,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
    }
}



export const getCategoryById = async (id: string) => {
    const numId = parseInt(id)

    return await categoryRepo.findById(numId) 
}


export const createCategory = async (name: string) => {
    const isExists = await prisma.category.findUnique({ where: { name } })
    if (isExists) throw new Error("Nama kategori sudah ada")

    return await prisma.category.create({ data: { name } })

}


export const updateCategory = async (
  id: string,
  data: Prisma.CategoryUpdateInput
) => {
  const numId = Number(id)
  if (!numId) throw new Error("ID kategori tidak valid")

  const isExists = await categoryRepo.findById(numId)
  if (!isExists) throw new Error("Kategori tidak ditemukan")

  return categoryRepo.update(numId, data)
}




export const deleteCategory = async (id?: string): Promise<Category> => {

    const numId = parseInt(id!);

    return await categoryRepo.softDelete(numId)

}


