import { products } from "../models/product.model"


// ROUTE PRODUCT 
// ROUTE 1
export const getAllProducts = () => {
    return { products, total: products.length }
}

// ROUTE 2
export const getProductById = (id: string) => {
    const numId = parseInt(id)
    const product = products.find(p => p.id === numId);

    if (!product) {
        throw new Error("Product tidak di temukan")
    }
    return product
}

// ROUTE 3
export const searchProduct = (name?: string,
    min_price?: string, max_price?: string) => {


    let result = products;

    if (name) {
        result = result.filter(p =>
            p.nama.toLowerCase().includes((name as string).toLowerCase())
        );
    }

    if (max_price) {
        result = result.filter(p => p.harga <= Number(max_price));
    }

    if (min_price) {
        result = result.filter(p => p.harga >= Number(min_price))
    }

    return result

}

// ROUTE 4
export const createProduct = (nama: string,
    deskripsi: string, harga: number) => {

    const newProduct = {
        id: products.length + 1,
        nama,
        deskripsi,
        harga
    }
    products.push(newProduct)

    return products
}

// ROUTE 5
export const updateProduct = (id: string, data: any) => {
    const numId = parseInt(id)
    const index = products.findIndex(p => p.id
        === numId)

    if (index === -1) {
        throw new Error("Produk tidak di temukan")
    }
    products[index] = { ...products[index], ...data }
    return products[index]

}

// ROUTE 6
export const deleteProduct = (id: string) => {
    const numId = parseInt(id)
    const index = products.findIndex(p => p.id === numId)

    if (index === -1) {
        throw new Error("Produk tidak ditemukan")
    }

    const deleted = products.splice(index, 1)

    return deleted
}