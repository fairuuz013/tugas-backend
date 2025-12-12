import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";

import {
    getAllOrder,
    getOrderById,
    searchOrder,
    createOrder,
    updateOrder,
    deleteOrder
} from "../services/order.services";


// GET ALL ORDER
export const getAll = async (_req: Request, res: Response) => {
    try {
        const { orders, total } = await getAllOrder();

        return successResponse(res, "Orders berhasil diambil", {
            jumlah: total,
            data: orders
        });
    } catch (err: any) {
        return errorResponse(res, err.message);
    }
};


// GET ORDER BY ID
export const getById = async (req: Request, res: Response) => {
    try {
        const order = await getOrderById(req.params.id!);

        return successResponse(res, "Order ditemukan", order);
    } catch (err: any) {
        return errorResponse(res, err.message);
    }
};


// SEARCH ORDER
export const search = async (req: Request, res: Response) => {
    try {
        const { userId, min_total, max_total } = req.query;

        const result = await searchOrder(
            userId ? Number(userId) : undefined,
            min_total ? Number(min_total) : undefined,
            max_total ? Number(max_total) : undefined
        );

        return successResponse(res, "Hasil pencarian orders", result);
    } catch (err: any) {
        return errorResponse(res, err.message);
    }
};


// CREATE ORDER
export const create = async (req: Request, res: Response) => {
    try {
        const order = await createOrder(req.body);

        return successResponse(res, "Order berhasil dibuat", order);
    } catch (err: any) {
        return errorResponse(res, err.message);
    }
};


// UPDATE ORDER
export const update = async (req: Request, res: Response) => {
    try {
        const order = await updateOrder(req.params.id!, req.body);

        return successResponse(res, "Order berhasil diperbarui", order);
    } catch (err: any) {
        return errorResponse(res, err.message);
    }
};


// DELETE ORDER (SOFT DELETE)
export const remove = async (req: Request, res: Response) => {
    try {
        const order = await deleteOrder(req.params.id!);

        return successResponse(res, "Order berhasil dihapus", order);
    } catch (err: any) {
        return errorResponse(res, err.message);
    }
};
