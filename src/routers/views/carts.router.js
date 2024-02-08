import { Router } from "express";
import CartsController from "../../controllers/carts.controller.js";

const router= Router();

router.get('/carts/:id',async (req,res)=>{
    const {id}= req.params;
    const cart = await CartsController.populate(id);
    res.render('cart', { products: cart.products.map(pro=>pro.toJSON()), title: 'Carrito',quantity:cart.quantity})
})


export default router;