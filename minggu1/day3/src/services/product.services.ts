import type { Category, Prisma, Product } from "../generated/client"
import type { IProductRepository } from "../repository/product.repository";;

interface FindAllParams {
    page: number,
    limit: number,
    search?: {
        name?: string,
        min_price?: number,
        max_price?: number
    }
    sortBy?: string,
    sortOrder?: 'asc' | 'desc';
}


export interface ProductListResponse {
    products: Product[],
    total: number,
    totalPages: number,
    currentPage: number,
}


export interface IProductService {
    list(params: FindAllParams): Promise<ProductListResponse>;
    getById(id: string) : Promise<Category | null & Product | null>
    create  (data: { name: string, description?: string, price: number, stock: number, categoryId?: number, image: string }): Promise<Product>
    update (id: string, data: Partial<Product>): Promise<Product>
    delete  (id: string): Promise<Product>
    exec(): Promise< {overview: any, byCategory: any }>
    
}


export class ProductServices implements IProductService {
    constructor(private productRepo: IProductRepository) { }
 
    // ROUTE PRODUCT 
    // ROUTE 1
    async  list  (params: FindAllParams): Promise<ProductListResponse>  {
     const { page, limit, search, sortBy, sortOrder } = params
    
     const skip = (page - 1) * limit
    
     const whereClause: Prisma.ProductWhereInput = { deletedAt: null }
    
     if (search?.name) whereClause.name = { contains: search.name, mode: 'insensitive' }
     if (search?.min_price) whereClause.price = { gte: search.min_price }
     if (search?.max_price) whereClause.price = { lte: search.max_price }
    
     const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy
         ? { [sortBy]: sortOrder || 'desc' }
         : { createdAt: 'desc' }
    
     const products = await this.productRepo.list(skip, limit, whereClause, sortCriteria)
    
     const total = await this.productRepo.countAll(whereClause)
    
     return {
         products,
         total,
         totalPages: Math.ceil(total / limit),
         currentPage: page,
     }

     
    }
    
    
    
    
    // ROUTE 2
    async  getById  (id: string) : Promise<Category | null & Product | null> {
     const numId = parseInt(id);
    
    
     const product = await this.productRepo.findById(numId)
    
     // manual filter soft delete
     if (!product || product.deletedAt !== null) {
         throw new Error("Product tidak di temukan");
     }
    
     return product;
    }
    
    
    // ROUTE 4
    async  create  (data: { name: string, description?: string, price: number, stock: number, categoryId?: number, image: string }): Promise<Product> {
     return await this.productRepo.create(data)
    }
    
    
    
    // ROUTE 5
    async update  (id: string, data: Partial<Product>): Promise<Product>{

    
     const numId = parseInt(id);
    
     return await this.productRepo.update(numId, data);
    };
    
    
    // ROUTE 6
    async delete  (id: string): Promise<Product> {
     const numId = parseInt(id);
    
     const product = await this.productRepo.findById(numId)
    
     if (!product || product.deletedAt !== null) {
         throw new Error("Product tidak ditemukan atau sudah dihapus");
     }
    
     // Baru update
     return await this.productRepo.softDelete(numId)
    };

    async exec() {
         const stats = await this.productRepo.getStats();
    const categoryStats = await this.productRepo.getProductsByCategoryStats();
    
    return {
      overview: stats,
      byCategory: categoryStats
    };
  
    }


}
   