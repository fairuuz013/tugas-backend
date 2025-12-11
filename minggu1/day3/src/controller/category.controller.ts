import type { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, searchCategory, updateCategory } from "../services/category.services";
import { successResponse } from "../utils/response";

export const getAll = async (_req: Request, res: Response) => {
    const categoris = await getAllCategory()

    successResponse(
        res,
        "kategori berasil di ambil",
        categoris,
        null,
        200
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


export const search = async (req: Request, res: Response) => {
    const { name } = req.query;

    const category = await searchCategory(name as string);

    successResponse(
        res,
        "Berhasil search category",
        category,
        null,
        200
    );
};


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

