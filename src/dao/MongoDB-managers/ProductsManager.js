import productModel from "../models/product-model.js";
import { BadRequestException,NotFound,Exception } from "../../utils.js";
import { logger } from "../../config/logger.js";

export default class ProductsManager{
    static getProducts(criteria={}){
        return productModel.find(criteria)
    }
    static async getProductById(id){
        const product= await productModel.findById(id);
        if(!product){
            logger.warning("no encontrado")
        }
        return product;
    }
    static async addProduct(data){
        let product= await productModel.findById(data._id);
        if(product){
            throw new Exception('El producto ya existe')
        }else if (!data.title || !data.description || !data.price || !data.category || !data.code || !data.stock) {
            throw new BadRequestException("Por favor llene todos los campos")
        }else{
            const product= await productModel.create(data);
            logger.info("El producto ha sido añadido");
            return product;
        }    
    }
    static async updateProductById(id,data){
        let product= await productModel.findById(id);
        if(!product){
            throw new NotFound('Producto no encontrado')
        }else{
            await productModel.updateOne({_id:id},{$set:data})
            logger.info("Producto actualizado")
        }
    }
    static async deleteProductById(id){
        let product= await productModel.findById(id);
        if(!product){
            throw new NotFound('Producto no encontrado')
        }else{
            await productModel.deleteOne({_id:id})
            logger.info("Producto eliminado")
        }
    }
}