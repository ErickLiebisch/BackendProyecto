import userModel from "../dao/models/user-model.js";
import cartModel from "../dao/models/cart-model.js";
import UsersService from "../services/users.service.js";
import TicketService from "../services/ticket.service.js";
import cartController from "./carts.controller.js";
import UsersController from "./users.controller.js";
import productController from "./products.controller.js";
import ticketModel from "../dao/models/ticket-model.js";
export default class TicketController {
    static async getAll(filters={}, opts={}) {
        const Tickets= TicketService.get(filters,opts);
        return Tickets;
    }
    static getOne(tid) {
        return TicketService.getById(tid);
    }
    
    static async createTicket(cid){
    const cartProducts= await cartController.getProductsFromCart(cid);
    const cartId= await cartController.getCartById(cid);
    const user= await UsersController.getOne({cart:cartId._id.toString()})
    const customer= user.email;
    const purchasedProducts=[];
    let total=0;
    for(let i=0; i<cartProducts.length;i++){
        let products= await productController.getProductById(cartProducts[i].product.toString());
        if(cartProducts[i].quantity<=products.stock){
            await productController.reduceProductStock(cartProducts[i].product.toString(),cartProducts[i].quantity);
            purchasedProducts.push(products);
            total+=products.price*cartProducts[i].quantity;
            await cartController.deleteProductFromCart(cid,cartProducts[i].product.toString());
            
        }
    }
    const newTicket={
        code:Date.now()+139,
        products:purchasedProducts,
        amount:total,
        purchaser:customer,
    }
    const ticket= await TicketService.create(newTicket);

    return ticket;
    
        
    }
    static async getById(id){
        const Ticket= await TicketService.getById(id);
        if(!Ticket){
            throw new Error(`Ticket ${id} not found`)
        }
        return Ticket
    }
    static updatebyId(tid,data){
        return TicketService.update(tid,data);
    }
    static deleteById(id){
        return TicketService.delete(id);
    }
}