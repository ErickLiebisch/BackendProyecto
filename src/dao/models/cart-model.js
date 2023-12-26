import mongoose from "mongoose";
const ProductSubSchema= new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref:'products'},
    quantity:{type:Number,default:1}
},{_id:false})

const CartSchema= new mongoose.Schema({
    products:{type: [ProductSubSchema],default:[]}
},{timestamps:true})


export default mongoose.model('carts',CartSchema);