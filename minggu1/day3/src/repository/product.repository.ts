
import type { Category, Prisma, PrismaClient, Product } from "../generated/client";
import type { Decimal } from "../generated/runtime/client";
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
    softDelete(id: number): Promise<Product>;
    findComplex(categoryName: string, maxPrice: number): Promise<Product[]>;
    getStats(): Promise<Prisma.GetProductAggregateType<{
        _count: {
            id: true;
        };
        _avg: {
            price: true;
        };
        _sum: {
            stock: true;
        };
        _min: {
            price: true;
        };
        _max: {
            price: true;
        };
    }>>
    getProductsByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
        _avg: {
            price: Decimal | null;
        };
        _count: {
            id: number;
        };
    })[]>
}

export class ProductRepository implements IProductRepository {
    constructor(private prisma: PrismaClient) {

    }


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

    async findComplex(categoryName: string, maxPrice: number) {
        return await this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { category: { name: categoryName } },
                            { price: { lt: maxPrice } },
                        ]
                    },
                    { category: { name: 'Aksesoris' } },
                ]
            }
        })
    }

    async getStats() {
        return await this.prisma.product.aggregate({
            _count: { id: true },      // Total jumlah produk
            _avg: { price: true },     // Rata-rata harga
            _sum: { stock: true },     // Total stok semua barang
            _min: { price: true },     // Harga termurah
            _max: { price: true }      // Harga termahal
        })
    }

    async getProductsByCategoryStats() {
        return await this.prisma.product.groupBy({
            by: ['categoryId'],
            _count: { id: true },
            _avg: { price: true }
        })
    }
}