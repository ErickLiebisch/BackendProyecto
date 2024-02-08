import ProductsService from "../services/products.service.js";

export default class ProductController {
    static getProducts(filter={}){
        return ProductsService.getAll(filter)
    }
    static async getProductById(id){
        const product= await ProductsService.getById(id);
        if(!product){
            throw new Error('Producto no encontrado')
        }
        return product;
    }
    static async addProduct(data){
        let product= await ProductsService.getById(id);
        if(product){
            console.log('El producto ya existe')
        }else if (!data.title || !data.description || !data.price || !data.category || !data.code || !data.stock) {
            console.log("Por favor llene todos los campos")
        }else{
            const product= await ProductsService.create(data);
            console.log("El producto ha sido añadido");
            return product;
        }    
    }
    static async updateProductById(id,data){
        let product= await ProductsService.getById(id);
        if(!product){
            console.log("El producto no fue encontrado")
        }else{
            await ProductsService.update(id,data)
            console.log("Producto actualizado")
        }
    }
    static async deleteProductById(id){
        let product= await ProductsService.getById(id);
        if(!product){
            console.log("El producto no fue encontrado")
        }else{
            await ProductsService.delete(id);
            console.log("Producto eliminado")
        }
    }
    static async paginate(criteria,options){
        return ProductsService.paginate(criteria,options);
    }
}