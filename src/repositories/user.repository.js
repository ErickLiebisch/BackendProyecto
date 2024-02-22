import user from "../dao/models/user.js";
import UserDTO from "../dto/user.dto.js";
export default class UserRepository{
    constructor(dao){
        this.dao=dao;
    }
    async getAll() {
       const users=this.dao.getAll();
       return users.map(contact=> new UserDTO(user));
    }
    async getOne(uid) {
        const user=this.dao.getOne(uid);
        if(user){
            user = new UserDTO(user);
        }
        return user;
      
    }
    async createUser(data) {
        const {
            first_Name,
            last_Name,
            email,
        }= data;
        const user=await this.dao.createUser(data);
        return new UserDTO(user)
       
    }
    async updateUserById(uid, data) {
        const {
            first_Name,
            last_Name,
            email,
        }= data;
        const dataDao={};
        if(first_Name){
            dataDao.first_Name=first_Name;
        }
        if(last_Name_Name){
            dataDao.last_Name=last_Name;
        }
        if(email){
            dataDao.email=email;
        }
        return this.dao.deleteById(uid);



    }
    deleteById(uid) {
      return this.dao.deleteById(uid); 
    }

}