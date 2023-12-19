import cartModel from "../models/cart-model.js";

export default class CartsManager{
    static async createCart(data){
      const cart= await cartModel.create(data);
      console.log("Carro creado exitosamente")
      return cart;
    }
    static getCarts() {
       return cartModel.find();
    }
    static async getProductsFromCart(cid){
       const cart= await cartModel.findById(cid)
       if(!cart){
        console.log("carrito no encontrado")
       }else{
        return cart.products
       }
    }
    static async addProductsToCart(cid,pid,quantity){
       const cart= await cartModel.findById(cid);
       if(!cart){
        console.log("carrito no encontrado")
       }else{
        const productExists= cart.products.find(pro=>pro.product===pid);
        if(!productExists){
            const newProduct={
                product:pid,
                quantity:quantity,
            }
            cart.products.push(newProduct);
            await cartModel.updateOne({_id:cid},cart);
            console.log('producto añadido exitosamente')
        }else{
            productExists.quantity= productExists.quantity+ quantity;
            await cartModel.updateOne({_id:cid},cart);
        }

       }
    }

    }

    
