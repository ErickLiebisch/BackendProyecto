import mongoose from "mongoose";
import { Schema } from "mongoose";
const DocumentsCollection = new mongoose.Schema({
    name: { type: String, required: false },
    reference: { type: String, required: false }
}, { _id: false });
const userSchema = new Schema({
    first_Name: { type: String, required: true },
    last_Name: { type: String, required: false },
    email: { type: String, required: false },
    age: { type: Number, required: false },
    password: { type: String, required: false },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, required: false, default: 'user', enum: ['user', 'admin', 'premium'] },
    documents: { type: [DocumentsCollection], default: [] },
    last_Connection: { type: Number, required: false },

}, { timestamps: true })

export default mongoose.model('users', userSchema);