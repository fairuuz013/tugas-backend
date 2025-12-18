import type { Request, Response } from "express";
import { 
    getAllOrderItems,
    getOrderItemById,
    searchOrderItem,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
} from "../services/orderItem.services";
import { successResponse, errorResponse } from "../utils/response";


// GET ALL

export const getAllOrderItemsController = async (req: Request, res: Response) => {
    const page = Number (req.query.page) || 1
    const limit = Number (req.query.limit) || 10

    const result = await getAllOrderItems({
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
        "Order items berhasil diambil",
        result.orderItems,
        pagination
    )
}

// GET BY ID
export const getById = async (req: Request, res: Response) => {
    try {
        const item = await getOrderItemById(Number(req.params.id));
        successResponse(res, "OrderItem ditemukan", item);
    } catch (err: any) {
        errorResponse(res, err.message);
    }
};


// SEARCH (optional)
export const search = async (req: Request, res: Response) => {
    try {
        const { orderId, productId } = req.query;

        const data = await searchOrderItem(
            orderId ? Number(orderId) : undefined,
            productId ? Number(productId) : undefined
        );

        successResponse(res, "Hasil pencarian OrderItem", data);
    } catch (err: any) {
        errorResponse(res, err.message);
    }
};


// CREATE
export const create = async (req: Request, res: Response) => {
    try {
        const { orderId, productId, quantity } = req.body;

        const newItem = await createOrderItem({
            orderId: Number(orderId),
            productId: Number(productId),
            quantity: Number(quantity)
        });

        successResponse(res, "OrderItem berhasil dibuat", newItem);
    } catch (err: any) {
        errorResponse(res, err.message);
    }
};


// UPDATE
export const update = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updated = await updateOrderItem(id, req.body);

        successResponse(res, "OrderItem berhasil diupdate", updated);
    } catch (err: any) {
        errorResponse(res, err.message);
    }
};


// DELETE (soft delete)
export const remove = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteOrderItem(id);

        successResponse(res, "OrderItem berhasil dihapus", deleted);
    } catch (err: any) {
        errorResponse(res, err.message);
    }
};
