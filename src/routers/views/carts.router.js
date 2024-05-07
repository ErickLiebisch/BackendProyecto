import { Router } from "express";
import CartsController from "../../controllers/carts.controller.js";

const router= Router();

router.get('/carts/:cid',async (req,res)=>{
    const {cid}= req.params;
    const cart = await CartsController.populate(cid);
    res.render('cart', { products: cart.products.map(pro=>pro.toJSON()), title: 'Carrito',quantity:cart.quantity})
})


export default router;