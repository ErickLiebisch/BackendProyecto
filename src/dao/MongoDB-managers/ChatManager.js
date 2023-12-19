import chatModel from "../models/chat-model.js";

export default class ChatManager{
    static getMessages(){
        return chatModel.find();
    }
    static async getMessageById(id){
        const message= await chatModel.findById(id)
        if(!message){
            throw new Error('el mensaje no fue encontrado')
        }
        return message;
    }
    static async sendMessage(data){
        const message= await chatModel.create(data);
        console.log('El mensaje fue enviado')
        return message;

    }
    static async updateMessage(id,data){
        await chatModel.updateOne({_id:id},{$set:data});
        console.log("mensaje actualizado exitosamente");
    }
    static async deleteMessage(id){
        await chatModel.deleteOne({_id:id});
        console.log("mensaje borrado exitosamente");
    }

}
