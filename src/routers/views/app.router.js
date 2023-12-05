import { Router } from "express";
import ProductManager from "../../ProductManager.js";
const productmanager= new ProductManager("Products.js");
const router = Router();

router.get('/realtimeproducts',async(req,res)=>{
    const products= await productmanager.getProducts();
    res.render('Home',{
        payload:products,
        title:'la tiendita de erick',
        isAdmin:true,
    });
});

export default router;