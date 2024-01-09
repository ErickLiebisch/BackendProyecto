import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema= new Schema({
    first_Name: {type:String,required:true},
    last_Name: {type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number, required:false},
    password:{type:String, required:true},
    role:{type:String, required:false, default:'user', enum: ['user','admin']},

},{timestamps:true})

export default mongoose.model('users',userSchema);