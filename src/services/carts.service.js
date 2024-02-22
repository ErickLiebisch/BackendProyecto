import CartsManager from "../dao/MongoDB-managers/CartsManager.js";

export default class CartsService{
    static async getAll(filter={}){
        return CartsManager.getCarts(filter);

    }
    static async getById(id){
        return CartsManager.getCartById(id);
    }
    static async create(data){
        return CartsManager.createCart(data)
    }
    static async update(id,data){
        return CartsManager.updateCartById(id,data);
    }
    static async delete(id){
        return CartsManager.deleteCart(id);
    }
    static async populate(id){
        const result= await CartsManager.populate(id)
        return result;
    
    }
    static async deleteProductFromCart(cid,pid){
        const result = await CartsManager.deleteProductFromCart(cid,pid)
       return result;

    }
}