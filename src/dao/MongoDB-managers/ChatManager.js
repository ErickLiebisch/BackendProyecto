import chatModel from "../models/chat-model.js";
import { NotFound } from "../../utils.js";
import { logger } from "../../config/logger.js";

export default class ChatManager{
    static getMessages(criteria={}){
        return chatModel.find(criteria);
    }
    static async getMessageById(id){
        const message= await chatModel.findById(id)
        if(!message){
            throw new NotFound('el mensaje no fue encontrado')
        }
        return message;
    }
    static async sendMessage(data){
        const message= await chatModel.create(data);
        logger.info('El mensaje fue enviado')
        return message;

    }
    static async updateMessage(id,data){
        await chatModel.updateOne({_id:id},{$set:data});
        logger.info("mensaje actualizado exitosamente");
    }
    static async deleteMessage(id){
        await chatModel.deleteOne({_id:id});
        logger.info("mensaje borrado exitosamente");
    }

}
