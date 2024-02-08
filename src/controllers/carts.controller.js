import CartsService from "../services/carts.service.js";

export default class CartsController{
    static async createCart(data){
        const cart= await CartsService.create(data);
        console.log("Carro creado exitosamente")
        return cart;
      }
      static getCarts(criteria={}) {
         return CartsService.find(criteria);
      }
      static getCartById(id){
          return CartsService.getById(id);
      }
      static async getProductsFromCart(cid){
         const cart= await CartsService.getById(cid)
         if(!cart){
          console.log("carrito no encontrado")
         }else{
          return cart.products
         }
      }
      static async addProductsToCart(cid,pid,quantity){
         const cart= await CartsService.getById(cid);
         if(!cart){
          console.log("carrito no encontrado")
         }else{
          const productExists= cart.products.find(pro=>pro.toString()===pid);
          if(!productExists){
              const newProduct={
                  product:pid,
                  quantity:quantity,
              }
              cart.products.push(newProduct);
              await CartsService.update({_id:cid},cart);
              console.log('producto añadido exitosamente')
          }else{
              productExists.quantity= productExists.quantity+ quantity;
              await CartsService.update({_id:cid},cart);
          }
  
         }
      }
      static async updateCartById(id,data){
          const cart= await CartsService.getById(id);
          if(!cart){
              console.log("el carrito no fue encontrado")
          }else{
              await CartsService.update({_id:id},{$set: data});
              console.log("carrito actualizo exitosamente")
          }
      }
      static async deleteProductsFromCart(id){
          const cart= await CartsService.getById(id);
          if(!cart){
              console.log("el carrito no fue encontrado")
          }else{
              empty= []
              await CartsService.update({_id:id},{products:empty})
              console.log("productos eliminados del carrito")
          }
      }
      static async updateQuantityPById(cid,pid,quantity){
          const cart= await CartsService.getById(cid);
          if(!cart){
              console.log("el carrito no fue encontrado")
          }else{
              const productIndex= cart.products.findIndex(pro=> pro.toString()===pid);
              const product= cart.products[productIndex]
              product.quantity=quantity;
  
              await CartsService.update({_id:cid},product)
          }
      }
  
      static async deleteProductFromCart(cid,pid){
          const cart= await CartsService.getById(cid);
          if(!cart){
              console.log("el carrito no fue encontrado")
          }else{
             const productToDelete=cart.products.findIndex(pro=>pro.toString()===pid);
              if(productToDelete!==-1){
                  cart.products.splice(productToDelete,1);
                  console.log("Producto eliminado")
              }else{
                  console.log("Producto no encontrado")
              }
          } 
  
      }
      static async updateProductsfromCartById(id,data){
          const cart= await CartsService.findById(id);
          if(!cart){
              console.log("el carrito no fue encontrado")
          }else{
            cart.products=data;
            const newProducts=cart.products;
            await CartsService.update({_id:id},{products:newProducts})
            console.log("productos actualizados")
          }
      }  
      static async deleteCart(id){
          let cart= await CartsService.findById(id);
          if(!cart){
              console.log("El carro no fue encontrado")
          }else{
              await CartsService.delete({_id:id})
              console.log("carro eliminado")
          }
      }
      static async populate(id){
        const result = await CartsService.populate(id);
        return result;
    
    }
     
      }
