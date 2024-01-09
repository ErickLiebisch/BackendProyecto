import mongoose from "mongoose";
import { URI } from "../utils.js";
export const initMongoDB= async ()=>{
    try {
       await mongoose.connect(URI)
       console.log('Conectado a base de datos') 
    } catch (error) {
        console.log('Un error inesperado ocurrió')
    }
}