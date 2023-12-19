import mongoose from "mongoose";

const ChatSchema= new mongoose.Schema({
    user:{type:String, required:true},
    message:{type:String, required:true},
},{timestamps:true});

export default mongoose.model('messages',ChatSchema);