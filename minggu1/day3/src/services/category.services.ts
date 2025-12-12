import type { Category } from "../generated/client"
import { getPrisma } from "../prisma"


const prisma = getPrisma()

export const getAllCategory = async () => {
    return await prisma.category.findMany({
        where: {
            deletedAt: null
        }
    })

}


export const getCategoryById = async (id: string) => {
    const numId = parseInt(id)

    return await prisma.category.findUnique({
        where: {
            id: numId,
            deletedAt: null
        }
    })
}


export const createCategory = async (name: string) => {
    const isExists = await prisma.category.findUnique({ where: { name } })
    if (isExists) throw new Error("Nama kategori sudah ada")

    return await prisma.category.create({ data: { name } })

}


export const updateCategory = async (id: string, data: Category) => {
    const numId = Number(id);

    if (!numId) {
        throw new Error("ID kategori tidak valid");
    }

    const isExists = await prisma.category.findUnique({
        where: { id: numId, deletedAt: null }
    });

    if (!isExists) {
        throw new Error("Kategori tidak ditemukan");
    }

    return await prisma.category.update({
        where: { id: numId, deletedAt: null },
        data: data
    });
};


export const searchCategory = async (name?: string): Promise<Category[]> => {
    return await prisma.category.findMany({
        where: {
            deletedAt: null,
            ...(name && {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            })
        }
    });
};


export const deleteCategory = async (id?: string): Promise<Category> => {

    const numId = parseInt(id!);

    return await prisma.category.update({
        where: {
            id: numId,
            deletedAt: null
        },
        data: { deletedAt: new Date() }
    });

}


