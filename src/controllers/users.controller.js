import UsersService from "../services/users.service.js";

export default class UsersController{
    static async getAll(filter={}){
        const users= UsersService.getAll(filter);
        return users;
    }
    static async getById(id){
        return UsersService.getById(id);  
    }
    static async create(data){
        return UsersService.create(data);
        
    }
    static async update(id,data){
        const filter={_id:id};
        const operation={$set:data};
        return UsersService.update(filter,operation);
        
    }
    static async delete(id){
        const filter={_id:id};
        return UsersService.delete(filter);
        
    }
    static async getOne(criteria={}){
        const user= await UsersService.getOne(criteria);
        return user;
    }
    static async upgradePremium(uid){
        const user= await UsersService.getById(uid);
        if (!user) {
            logger.error('User not found');
        } else if(user.role==="user") {
            await UsersService.update(uid,{role:"premium"});
        }else{
            await UsersService.update(uid,{role:"user"});
        }
    }
}
