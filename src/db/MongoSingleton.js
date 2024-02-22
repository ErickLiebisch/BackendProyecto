import config from "../config/config.js";
import mongoose from "mongoose";

const URI= config.mongoDBURI;
export default class MongoSingleton{
    static #instance;
    constructor(){
        mongoose.connect(URI,{})
        .then(()=>console.log("conectado a la base de datos"))
        .catch((error)=>console.log(error.message));
    }
    static getInstance(){
        if(MongoSingleton.#instance){
            console.log('ya existe una instacia de MongoSingleton')
            return MongoSingleton.#instance;
        }else{
            console.log("creando instancia")
            MongoSingleton.#instance=new MongoSingleton();
        }
    }

}