import TicketManager from "../dao/MongoDB-managers/TicketManager.js";

export default class TicketsService{
    static async getAll(filter={}){
        return TicketManager.getAll(filter)
    }
    static async getById(id){
        return TicketManager.getById(id)
    }
    static async create(data){
        return TicketManager.create(data)
    }
    static async update(id,data){
        return TicketManager.update(id,data)
    }
    static async delete(id){
        return TicketManager.delete(id)
    }
    static async getOne(criteria={}){
        const Ticket= await TicketManager.getOne(criteria);
        return Ticket;
    }
}