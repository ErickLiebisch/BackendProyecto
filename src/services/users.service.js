import UserManager from "../dao/MongoDB-managers/UserManager.js";

export default class UsersService{
    static async getAll(filter={}){
        return UserManager.getAll(filter)
    }
    static async getById(id){
        return UserManager.getById(id)
    }
    static async create(data){
        return UserManager.create(data)
    }
    static async update(id,data){
        return UserManager.update(id,data)
    }
    static async delete(id){
        return UserManager.delete(id)
    }
    static async getOne(criteria={}){
        const user= await UserManager.getOne(criteria);
        return user;
    }
}