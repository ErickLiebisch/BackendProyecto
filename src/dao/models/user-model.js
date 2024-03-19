import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema= new Schema({
    first_Name: {type:String,required:true},
    last_Name: {type:String,required:false},
    email:{type:String,required:false},
    age:{type:Number, required:false},
    password:{type:String, required:false},
    cart:{type:mongoose.Schema.Types.ObjectId, ref:'carts'},
    role:{type:String, required:false, default:'user', enum: ['user','admin','premium']},

},{timestamps:true})

export default mongoose.model('users',userSchema);