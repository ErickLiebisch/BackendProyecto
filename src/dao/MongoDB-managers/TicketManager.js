import ticketModel from "../models/ticket-model.js";

export default class ticketManager {
    static async getAll(criteria={}){
        const tickets= ticketModel.find(criteria);
        return tickets;
    }
    static async getById(id){
        return ticketModel.findById(id);  
    }
    static async create(data){
        return ticketModel.create(data);
        
    }
    static async update(id,data){
        const criteria={_id:id};
        const operation={$set:data};
        return ticketModel.updateOne(criteria,operation);
        
    }
    static async delete(id){
        const criteria={_id:id};
        return ticketModel.deleteOne(criteria);
        
    }
    static async getOne(criteria={}){
        const ticket= await ticketModel.findOne(criteria)
        return ticket;
    }
}