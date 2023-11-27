import ProductManager from "../../ProductManager.js";
import CartManager from "../../CartManager.js";
import { Router } from "express";

const router= Router();

const productmanager= new ProductManager('Products.js');
const cartmanager= new CartManager('Carts.js');

router.post('/carts',async(req,res)=>{
await cartmanager.createCart();
const carts= await cartmanager.getCarts();
res.status(201).json(carts);
})

router.get('/carts/:cid', async(req,res)=>{
    const {cid}= req.params;
    const cart= await cartmanager.getProductsFromCart(parseInt(cid));
    if(!cart){
        res.status(404).json({error:'Cart not found'});
    }else{
        res.status(200).json(cart);
    }
})
router.post('/carts/:cid/product/:pid',async (req,res)=>{
    const {cid,pid}=req.params;
    const body=req.body;
    const product= await productmanager.getProductById(parseInt(pid));
    const cart= await cartmanager.getProductsFromCart(parseInt(cid));
    if(!product || !cart){
        res.status(404).json('product or cart not found')
    }else{
        await cartmanager.addProductsToCart(parseInt(cid),parseInt(pid),body.quantity);
        const cartUpdated= await cartmanager.getProductsFromCart(parseInt(cid));
        res.status(201).json(cartUpdated);
    }
})


export default router;