import CartsController from "../../controllers/carts.controller.js";
import ProductController from "../../controllers/products.controller.js";
import TicketController from "../../controllers/ticket.controller.js";
import { Router } from "express";
import { buildResponsePaginated,StrategyMiddleware,authMiddleware } from "../../utils.js";

const router= Router();


router.post('/carts',async(req,res)=>{
const {body}=req;
//await cartmanager.createCart();
//const carts= await cartmanager.getCarts();
await CartsController.createCart(body);
const carts= await CartsController.getCarts();
res.status(201).json(carts);
})

router.get('/carts',async(req,res)=>{
    const carts= await CartsController.getCarts();
    res.status(200).json(carts);
})

router.get('/carts/:cid', async(req,res)=>{
    const {cid}= req.params;
    //const cart= await cartmanager.getProductsFromCart(parseInt(cid));
    const cart= await CartsController.getProductsFromCart(cid).populate('products.product')
    if(!cart){
        res.status(404).json({error:'Cart not found'});
    }else{
        res.status(200).json(cart);
    }
})
router.post('/carts/:cid/product/:pid',StrategyMiddleware('jwt'),authMiddleware(['user','premium']),async (req,res)=>{
    const {cid,pid}=req.params;
    const body=req.body;
    //const product= await productmanager.getProductById(parseInt(pid));
    //const cart= await cartmanager.getProductsFromCart(parseInt(cid));
    const product= await ProductController.getProductById(pid);
    const cart= await CartsController.getProductsFromCart(cid)
    if(!product || !cart){
        res.status(404).json('product or cart not found')
    }else if(user.role==="premium" && product.owner!==user.email){
        req.logger.error('error cannot add products of the same owner as cart')
     }else{
         await CartsController.addProductsToCart(cid,pid,body.quantity);
         res.status(201).json(cart);
     }
})
router.put('/carts/:id',StrategyMiddleware('jwt'),authMiddleware(['user','premium']), async (req,res)=>{
    const {id}= req.params;
    const {body}=req;
    await CartsController.updateProductsfromCartById(id,body);
    res.status(204).end();
})
router.delete('/carts/:id',StrategyMiddleware('jwt'),authMiddleware(['user','premium']), async (req,res)=>{
    const {id}=req.params;
    await CartsController.deleteProductsFromCart(id)
    res._construct(204).end();
})
router.delete('/carts/:cid/products/:pid',StrategyMiddleware('jwt'),authMiddleware(['user','premium']), async (req,res)=>{
    const {cid,pid}=req.params;
    await CartsController.deleteProductFromCart(cid,pid);
    res.status(204).end();
})
router.put('/carts/:cid/products/:pid',StrategyMiddleware('jwt'),authMiddleware(['user','premium']), async (req,res)=>{
    const {cid,pid}=req.params;
    const { body}=req;
    await CartsController.updateQuantityPById(cid,pid,body.quantity)
    res.status(204).end();
})
router.post('/carts/:cid/purchase', async (req,res)=>{
    const {cid}=req.params;
    await TicketController.createTicket(cid)
    res.status(204).end;
   })



export default router;