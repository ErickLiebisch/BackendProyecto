import mongoose, {Schema} from "mongoose";

const ticketSchema= new Schema({
    code:{type:String, required: true},
    products:{type:[],required:true},
    amount:{type:Number, required:false},
    purchaser:{type:String, required:true}
},{timestamps:true});

export default mongoose.model('Ticket', ticketSchema);