import ProductManager from "../../dao/Fs-managers/ProductManager.js";
import CartManager from "../../dao/Fs-managers/CartManager.js";
import PManager from "../../dao/MongoDB-managers/ProductsManager.js";
import CManager from "../../dao/MongoDB-managers/CartsManager.js";
import { Router } from "express";

const router= Router();

const productmanager= new ProductManager('Products.js');
const cartmanager= new CartManager('Carts.js');

router.post('/carts',async(req,res)=>{
const {body}=req;
//await cartmanager.createCart();
//const carts= await cartmanager.getCarts();
await CManager.createCart(body);
const carts= await CManager.getCarts();
res.status(201).json(carts);
})

router.get('/carts/:cid', async(req,res)=>{
    const {cid}= req.params;
    //const cart= await cartmanager.getProductsFromCart(parseInt(cid));
    const cart= await CManager.getProductsFromCart(cid)
    if(!cart){
        res.status(404).json({error:'Cart not found'});
    }else{
        res.status(200).json(cart);
    }
})
router.post('/carts/:cid/product/:pid',async (req,res)=>{
    const {cid,pid}=req.params;
    const body=req.body;
    //const product= await productmanager.getProductById(parseInt(pid));
    //const cart= await cartmanager.getProductsFromCart(parseInt(cid));
    const product= await PManager.getProductById(pid);
    const cart= await cartmanager.getProductsFromCart(cid)
    if(!product || !cart){
        res.status(404).json('product or cart not found')
    }else{
        //await cartmanager.addProductsToCart(parseInt(cid),parseInt(pid),body.quantity);
        //const cartUpdated= await cartmanager.getProductsFromCart(parseInt(cid));
        await CManager.addProductsToCart(cid,pid,body.quantity);
        res.status(201).json(cart);
    }
})


export default router;