import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { IOrderItemService } from "../services/orderItem.services";

export class OrderItemController {
  constructor(private orderItemService: IOrderItemService) {}

  // 1 - LIST
  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as any;
    const sortBy = req.query.sortBy as string;
    const sortOrder =
      (req.query.sortOrder as "asc" | "desc") || "desc";

    const result = await this.orderItemService.list({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    });

    successResponse(
      res,
      "Order items berhasil diambil",
      result.items,
      {
        page: result.currentPage,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      }
    );
  }

  // 2 - GET BY ID
  async getById(req: Request, res: Response) {
    const item = await this.orderItemService.getById(
      req.params.id!
    );
    successResponse(res, "Order item ditemukan", item);
  }

  // 3 - CREATE
  async create(req: Request, res: Response) {
    const item = await this.orderItemService.create(req.body);
    successResponse(
      res,
      "Order item berhasil dibuat",
      item,
      null,
      201
    );
  }

  // 4 - UPDATE
  async update(req: Request, res: Response) {
    const item = await this.orderItemService.update(
      req.params.id!,
      req.body
    );
    successResponse(res, "Order item berhasil diupdate", item);
  }

  // 5 - DELETE
  async remove(req: Request, res: Response) {
    const item = await this.orderItemService.delete(
      req.params.id!
    );
    successResponse(res, "Order item berhasil dihapus", item);
  }
}
