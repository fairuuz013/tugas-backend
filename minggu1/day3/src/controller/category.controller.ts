import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { ICategoryService } from "../services/category.services";

export interface ICategoryController {
  list(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
}

export class CategoryController implements ICategoryController {
  constructor(private categoryService: ICategoryService) {}

  // 1 - LIST
  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as any;
    const sortBy = req.query.sortBy as string;
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

    const result = await this.categoryService.list({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    });

    successResponse(
      res,
      "Category berhasil diambil",
      result.categories,
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
    const category = await this.categoryService.getById(req.params.id!);

    successResponse(res, "Category ditemukan", category);
  }

  // 3 - CREATE
  async create(req: Request, res: Response) {
    const category = await this.categoryService.create(req.body);

    successResponse(res, "Category berhasil dibuat", category, null, 201);
  }

  // 4 - UPDATE
  async update(req: Request, res: Response) {
    const category = await this.categoryService.update(
      req.params.id!,
      req.body
    );

    successResponse(res, "Category berhasil diupdate", category);
  }

  // 5 - DELETE
  async remove(req: Request, res: Response) {
    const category = await this.categoryService.delete(req.params.id!);

    successResponse(res, "Category berhasil dihapus", category);
  }
}
