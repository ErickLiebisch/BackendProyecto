import ProductsService from "../services/products.service.js";
import { logger } from "../config/logger.js";

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
        let product= await ProductsService.getById(data._id);
        if(product){
            logger.warning('El producto ya existe')
        }else if (!data.title || !data.description || !data.price || !data.category || !data.code || !data.stock) {
            logger.error("Por favor llene todos los campos")
        }else{
            const product= await ProductsService.create(data);
            logger.info("El producto ha sido añadido");
            return product;
        }    
    }
    static async updateProductById(id,data){
        let product= await ProductsService.getById(id);
        if(!product){
            logger.warning("El producto no fue encontrado")
        }else{
            await ProductsService.update(id,data)
            logger.info("Producto actualizado")
        }
    }
    static async reduceProductStock(id,purchase){
        let product = await ProductsService.getById(id);
        if (!product) {
           logger.warning(" El producto con codigo " + id + " no existe");
            return
        } else {
            product.stock=product.stock-purchase;
           await ProductsService.update({_id:id},product);
           logger.info('product updated succesfully');
        }
    }
    static async deleteProductById(id){
        let product= await ProductsService.getById(id);
        if(!product){
           logger.warning("El producto no fue encontrado")
        }else{
            await ProductsService.delete(id);
            logger.info("Producto eliminado")
        }
    }
    static async paginate(criteria,options){
        return ProductsService.paginate(criteria,options);
    }
}