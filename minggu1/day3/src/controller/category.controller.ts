import type { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../services/category.services";
import { successResponse } from "../utils/response";


export const  getAllCategories = async (req: Request, res: Response) => {
    
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) ||  10 

    const result = await getAllCategory({
        page,
        limit 
    })

    const pagination = {
        page: result.currentPage,
        limit,
        total: result.total,
        totalPages: result.totalPages
    }

    successResponse(
        res, 
        "Order items berasil diambil",
        result.orderItems,
        pagination
    )
}


export const create = async (req: Request, res: Response) => {
    const category = await createCategory(req.body.name)

    successResponse (
        res,
        'kategori berasil di buat',
        category,
        null,
        201
    )
}


export const update = async (req: Request, res: Response) => {
    const category = await updateCategory(req.params.id!, req.body);

    successResponse(
        res,
        "Berhasil update category",
        category,
        null,
        200
    );
};




export const getById = async (req: Request, res: Response) => {
    const category = await getCategoryById(req.params.id!);

    successResponse(
        res,
        "Berhasil mengambil category",
        category,
        null,
        200
    );
}



export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await deleteCategory(id);

    return successResponse(
        res,
        "Berhasil hapus category",
        category,
        null,
        200
    );
};

