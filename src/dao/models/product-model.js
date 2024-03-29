import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema= new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    thumbnail:{type: Array, required: false},
    code:{type: String, required: true},
    status:{type: Boolean, required: true},
    stock:{type: Number, required: true},
    category:{type: String, required: true},
    owner:{type:String,required:false,default:'adminCoder@coder.com'}
    
},{timestamps:true});

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model('products',ProductSchema);