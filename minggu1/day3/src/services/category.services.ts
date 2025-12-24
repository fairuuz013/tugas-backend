import type { Prisma, Category } from "../generated/client";
import type { ICategoryRepository } from "../repository/category.repository";

/* =====================
   PARAMS & RESPONSE
===================== */

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CategoryListResponse {
  categories: Category[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/* =====================
   SERVICE INTERFACE
===================== */

export interface ICategoryService {
  list(params: FindAllParams): Promise<CategoryListResponse>;
  getById(id: string): Promise<Category>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
  delete(id: string): Promise<Category>;
  findComplex(name: string, maxProductPrice: number): Promise<Category[]>;


}




/* =====================
   SERVICE IMPLEMENTATION
===================== */

export class CategoryServices implements ICategoryService {
  constructor(private categoryRepo: ICategoryRepository) { }

  // ROUTE 1 - LIST
  async list(params: FindAllParams): Promise<CategoryListResponse> {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const whereClause: Prisma.CategoryWhereInput = {
      deletedAt: null,
    };

    if (search?.name) {
      whereClause.name = { contains: search.name, mode: "insensitive" };
    }

    const sortCriteria: Prisma.CategoryOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { createdAt: "desc" };

    const categories = await this.categoryRepo.list(
      skip,
      limit,
      whereClause,
      sortCriteria
    );

    const total = await this.categoryRepo.countAll(whereClause);

    return {
      categories,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  // ROUTE 2 - GET BY ID
  async getById(id: string): Promise<Category> {
    const numId = parseInt(id);

    const category = await this.categoryRepo.findById(numId);

    if (!category || category.deletedAt !== null) {
      throw new Error("Category tidak ditemukan");
    }

    return category;
  }

  // ROUTE 3 - CREATE
  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.categoryRepo.create(data);
  }

  // ROUTE 4 - UPDATE
  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    const numId = parseInt(id);
    return await this.categoryRepo.update(numId, data);
  }

  // ROUTE 5 - DELETE (SOFT)
async delete(id: string): Promise<Category> {
  const numId = parseInt(id);

  const category = await this.categoryRepo.findById(numId);

  if (!category) {
    throw new Error("Category tidak ditemukan atau sudah dihapus");
  }

  return await this.categoryRepo.softDelete(numId);
}

  async findComplex(
    name: string,
    maxProductPrice: number
  ): Promise<Category[]> {

    if (!name && !maxProductPrice) {
      throw new Error("Minimal salah satu parameter harus diisi");
    }

    return await this.categoryRepo.findComplex(
      name,
      maxProductPrice
    );
  }

  
}

