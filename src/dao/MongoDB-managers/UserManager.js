import userModel from "../models/user-model.js";

export default class UserManager {
    static async getAll(criteria={}){
        const users= userModel.find(criteria);
        return users;
    }
    static async getById(id){
        return userModel.findById(id);  
    }
    static async create(data){
        return userModel.create(data);
        
    }
    static async update(id,data){
        const criteria={_id:id};
        const operation={$set:data};
        return userModel.updateOne(criteria,operation);
        
    }
    static async delete(id){
        const criteria={_id:id};
        return userModel.deleteOne(criteria);
        
    }
    static async getOne(criteria={}){
        const user= await userModel.findOne(criteria)
        return user;
    }
}