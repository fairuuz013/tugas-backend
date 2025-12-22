import type { Category, Prisma, PrismaClient, Product } from "../generated/client";

export interface IProductRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.ProductWhereInput,
        orderBy: Prisma.ProductOrderByWithRelationInput
    ): Promise<Product[]>;
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: number): Promise<Category | null & Product | null>;
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    softDelete(id: number): Promise<Product>
}

export class ProductRepository implements IProductRepository {
    constructor(private prisma: PrismaClient) { }


    // list
    async list(
        skip: number,
        take: number,
        where: Prisma.ProductWhereInput,
        orderBy: Prisma.ProductOrderByWithRelationInput
    ): Promise<Product[]> {
        return await this.prisma.product.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { category: true }
        })
    }

    // COUNTALL 
    async countAll(where: Prisma.ProductWhereInput): Promise<number> {
        return await this.prisma.product.count({ where })
    }

    // FINDBYID 
    async findById(id: number): Promise<Category | null & Product | null> {
        return await this.prisma.product.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                category: true
            }
        })
    }


    // CREATE 
    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return await this.prisma.product.create({ data })
    }

    //UPDATE 
    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return await this.prisma.product.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    //DELETE
    async softDelete(id: number): Promise<Product> {
        return await this.prisma.product.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
}