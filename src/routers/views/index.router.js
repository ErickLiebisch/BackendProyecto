import { Router } from "express";
import ProductsManager from "../../dao/MongoDB-managers/ProductsManager.js";

const router= Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Welcome to fungstore'})
});

router.get('/chat',(req,res)=>{
    res.render('chat',{title:'Chat de clientes'});
})


export default router;