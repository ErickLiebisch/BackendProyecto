import ChatsService from "../services/chats.service.js";


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
        console.log('El mensaje fue enviado')
        return message;

    }
    static async updateMessage(id,data){
        await ChatsService.update({_id:id},{$set:data});
        console.log("mensaje actualizado exitosamente");
    }
    static async deleteMessage(id){
        await ChatsService.delete({_id:id});
        console.log("mensaje borrado exitosamente");
    }
}