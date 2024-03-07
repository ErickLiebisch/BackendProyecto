import mongoose from "mongoose";
import { URI } from "../utils.js";
import { logger } from "../config/logger.js";
export const initMongoDB= async ()=>{
    try {
       await mongoose.connect(URI)
       logger.info('Conectado a base de datos') 
    } catch (error) {
        logger.error('Un error inesperado ocurrió')
    }
}