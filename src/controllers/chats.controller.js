import ChatsService from "../services/chats.service.js";
import { logger } from "../config/logger.js";


export default class ChatsController{
    static getMessages(filter={}){
        return ChatsService.getAll(filter);
    }
    static async getMessageById(id){
        const message= await ChatsService.getById(id)
        if(!message){
            throw new Error('el mensaje no fue encontrado')
        }
        return message;
    }
    static async sendMessage(data){
        const message= await ChatsService.create(data);
        logger.info('El mensaje fue enviado')
        return message;

    }
    static async updateMessage(id,data){
        await ChatsService.update({_id:id},{$set:data});
        logger.info("mensaje actualizado exitosamente");
    }
    static async deleteMessage(id){
        await ChatsService.delete({_id:id});
        logger.info("mensaje borrado exitosamente");
    }
}