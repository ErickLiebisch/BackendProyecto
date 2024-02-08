import ChatManager from "../dao/MongoDB-managers/ChatManager";

export default class ChatsService{
    static async getAll(filter={}){
        return ChatManager.getMessages(filter);

    }
    static async getById(id){
        return ChatManager.getMessageById(id);
    }
    static async create(data){
        return ChatManager.sendMessage(data);
    }
    static async update(id,data){
        return ChatManager.updateMessage(id,data);
    }
    static async delete(id){
        return ChatManager.deleteMessage(id);
    }
}