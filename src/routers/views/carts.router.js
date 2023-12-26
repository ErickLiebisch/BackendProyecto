import { Router } from "express";

import cartModel from "../../dao/models/cart-model.js";


const router= Router();

router.get('/carts/:id',async (req,res)=>{
    const {id}= req.params;
    const cart = await cartModel.findOne({_id:id}).populate('products.product');
    res.render('cart', { products: cart.products.map(pro=>pro.toJSON()), title: 'Carrito',quantity:cart.quantity})
})


export default router;