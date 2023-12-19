import mongoose from "mongoose";

const ProductSchema= new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    thumbnail:{type: Array, required: false},
    code:{type: String, required: true},
    status:{type: Boolean, required: true},
    stock:{type: Number, required: true},
    category:{type: String, required: true},
    
},{timestamps:true});

export default mongoose.model('products',ProductSchema);