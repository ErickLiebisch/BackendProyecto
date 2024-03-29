import cartModel from "../models/cart-model.js";
import { NotFound } from "../../utils.js";
import { logger } from "../../config/logger.js";

export default class CartsManager{
    static async createCart(data){
      const cart= await cartModel.create(data);
      logger.info("Carro creado exitosamente")
      return cart;
    }
    static getCarts(criteria={}) {
       return cartModel.find(criteria);
    }
    static getCartById(id){
        return cartModel.findById(id);
    }
    static async getProductsFromCart(cid){
       const cart= await cartModel.findById(cid)
       if(!cart){
        throw new NotFound("carrito no encontrado")
       }else{
        return cart.products
       }
    }
    static async addProductsToCart(cid,pid,quantity){
       const cart= await cartModel.findById(cid);
       if(!cart){
        throw new NotFound("carrito no encontrado")
       }else{
        const productExists= cart.products.find(pro=>pro.toString()===pid);
        if(!productExists){
            const newProduct={
                product:pid,
                quantity:quantity,
            }
            cart.products.push(newProduct);
            await cartModel.updateOne({_id:cid},cart);
            logger.info('producto añadido exitosamente')
        }else{
            productExists.quantity= productExists.quantity+ quantity;
            await cartModel.updateOne({_id:cid},cart);
        }

       }
    }
    static async updateCartById(id,data){
        const cart= await cartModel.findById(id);
        if(!cart){
            throw new NotFound("carrito no encontrado")
        }else{
            await cartModel.updateOne({_id:id},{$set: data});
            logger.info("carrito actualizo exitosamente")
        }
    }
    static async deleteProductsFromCart(id){
        const cart= await cartModel.findById(id);
        if(!cart){
            throw new NotFound("carrito no encontrado")
        }else{
            empty= []
            await cartModel.updateOne({_id:id},{products:empty})
            logger.info("productos eliminados del carrito")
        }
    }
    static async updateQuantityPById(cid,pid,quantity){
        const cart= await cartModel.findById(cid);
        if(!cart){
            throw new NotFound("carrito no encontrado")
        }else{
            const productIndex= cart.products.findIndex(pro=> pro.toString()===pid);
            const product= cart.products[productIndex]
            product.quantity=quantity;

            await cartModel.updateOne({_id:cid},product)
        }
    }

    static async deleteProductFromCart(cid,pid){
        const cart= await cartModel.findById(cid);
        if(!cart){
            throw new NotFound("carrito no encontrado")
        }else{
           const productToDelete=cart.products.findIndex(pro=>pro.product.toString()===pid);
            if(productToDelete!==-1){
                cart.products.splice(productToDelete,1);
                await cartModel.updateOne({_id:cid},cart);
                logger.info("Producto eliminado")
            }else{
                throw new NotFound("Producto no encontrado")
                
            }
        } 

    }
    static async updateProductsfromCartById(id,data){
        const cart= await cartModel.findById(id);
        if(!cart){
            throw new NotFound("carrito no encontrado")
        }else{
          cart.products=data;
          const newProducts=cart.products;
          await cartModel.updateOne({_id:id},{products:newProducts})
          logger.info("productos actualizados")
        }
    }  
    static async deleteCart(id){
        let cart= await cartModel.findById(id);
        if(!cart){
            throw new NotFound("carrito no encontrado")
        }else{
            await cartModel.deleteOne({_id:id})
            logger.info("carro eliminado")
        }
    }

    static async populate(id){
        const result =await cartModel.findOne({_id:id}).populate('products.product');
        return result;
    
    }
}

    

    
