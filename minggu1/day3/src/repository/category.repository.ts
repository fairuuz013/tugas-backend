import type { Prisma, PrismaClient, Category } from "../generated/client";

export interface ICategoryRepository {
  list(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ): Promise<Category[]>;

  countAll(where: Prisma.CategoryWhereInput): Promise<number>;

  findById(id: number): Promise<Category | null>;

  create(data: Prisma.CategoryCreateInput): Promise<Category>;

  update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;

  softDelete(id: number): Promise<Category>;

   findComplex(
    name: string,
    maxProductPrice: number
  ): Promise<Category[]>;

}

export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) { }

  async list(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ): Promise<Category[]> {
    return this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async countAll(where: Prisma.CategoryWhereInput): Promise<number> {
    return this.prisma.category.count({ where });
  }

  async findById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async softDelete(id: number): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }


  async findComplex(
    name: string,
    maxProductPrice: number
  ): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: {
        deletedAt: null,

        OR: [
          // CATEGORY BERDASARKAN NAMA
          {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },

          // Category yang punya product murah 
          {
            products: {
              some: {
                price: {
                  lt: maxProductPrice,
                },
              },
            },
          },
        ],
      },
      include: {
        products: true,
      },
    });
  }


}
