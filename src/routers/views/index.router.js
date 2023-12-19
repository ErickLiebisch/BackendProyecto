import { Router } from "express";
import ProductsManager from "../../dao/MongoDB-managers/ProductsManager.js";

const router= Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Welcome to fungstore'})
});
router.get('/products', async (req,res)=>{
    const products= await ProductsManager.getProducts();
    res.render('products',{products: products.map(prod=>prod.toJSON()),title:'lista de productos'})
})
router.get('/chat',(req,res)=>{
    res.render('chat',{title:'Chat de clientes'});
})


export default router;