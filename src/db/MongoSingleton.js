import config from "../config/config.js";
import mongoose from "mongoose";
import { logger } from "../config/logger.js";

const URI= config.mongoDBURI;
export default class MongoSingleton{
    static #instance;
    constructor(){
        mongoose.connect(URI,{})
        .then(()=>logger.info("conectado a la base de datos"))
        .catch((error)=>console.log(error.message));
    }
    static getInstance(){
        if(MongoSingleton.#instance){
            logger.warning('ya existe una instacia de MongoSingleton')
            return MongoSingleton.#instance;
        }else{
            logger.info("creando instancia")
            MongoSingleton.#instance=new MongoSingleton();
        }
    }

}