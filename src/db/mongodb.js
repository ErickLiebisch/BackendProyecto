import mongoose from "mongoose";
const URI= 'mongodb+srv://erickliebisch:roBR732GGbrXxw5J@cluster0.genvpqy.mongodb.net/'
export const initMongoDB= async ()=>{
    try {
       await mongoose.connect(URI)
       console.log('Conectado a base de datos') 
    } catch (error) {
        console.log('Un error inesperado ocurrió')
    }
}