import productModel from "../models/product-model.js";

export default class ProductsManager{
    static getProducts(){
        return productModel.find()
    }
    static async getProductById(id){
        const product= await productModel.findById(id);
        if(!product){
            throw new Error('Producto no encontrado')
        }
        return product;
    }
    static async addProduct(data){
        let product= await productModel.findById(data._id);
        if(product){
            console.log('El producto ya existe')
        }else if (!data.title || !data.description || !data.price || !data.category || !data.code || !data.stock) {
            console.log("Por favor llene todos los campos")
        }else{
            const product= await productModel.create(data);
            console.log("El producto ha sido añadido");
            return product;
        }    
    }
    static async updateProductById(id,data){
        let product= await productModel.findById(id);
        if(!product){
            console.log("El producto no fue encontrado")
        }else{
            await productModel.updateOne({_id:id},{$set:data})
            console.log("Producto actualizado")
        }
    }
    static async deleteProductById(id){
        let product= await productModel.findById(id);
        if(!product){
            console.log("El producto no fue encontrado")
        }else{
            await productModel.deleteOne({_id:id})
            console.log("Producto eliminado")
        }
    }
}