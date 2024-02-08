import ProductsManager from "../dao/MongoDB-managers/ProductsManager.js";

export default class ProductsService{
    static async getAll(filter={}){
        return ProductsManager.getProducts(filter);
    }
    static async getById(id){
        return ProductsManager.getProductById(id)
    }
    static async create(data){
        return ProductsManager.addProduct(data)
    }
    static async update(id,data){
        return ProductsManager.updateProductById(id,data)
    }
    static async delete(id){
        return ProductsManager.deleteProductById(id);
    }
    static async paginate(criteria,options){
        const result= await productModel.paginate(criteria,options);
        return result;
    }
}