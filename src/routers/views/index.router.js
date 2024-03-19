import { Router } from "express";

import cartModel from "../../dao/models/cart-model.js";
import CartsController from "../../controllers/carts.controller.js";
import ProductController from "../../controllers/products.controller.js";
import { StrategyMiddleware,authMiddleware, verifyToken } from "../../utils.js";
import { error } from "console";

const router= Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Tiendita de Erick'})
});

router.get('/chat',StrategyMiddleware('jwt'),authMiddleware(['user']),(req,res)=>{
    res.render('chat',{title:'Chat de clientes'});
})

router.get('/profile',StrategyMiddleware('jwt'),async (req,res) =>{
    if(!req.user){
        return res.redirect('/login')
    }else if(req.user.email==="adminCoder@coder.com"){
        const products= await ProductController.getProducts();
        res.render('profile', { products: products.map(pro=>pro.toJSON()), title: 'Welcome back',user:req.user})  
    }else{
        const products = await ProductController.getProducts();
        res.render('profile', {products: products.map(pro=>pro.toJSON()), title:'Bienvenido/a de vuelta', user:req.user})
    }
})

router.get('/login', async (req,res)=>{
    res.render('login', {title:'Inicio de sesión'})
})
router.get('/register', async (req,res)=>{
    res.render('register',{title:'Registro'})
})

router.get('/current',StrategyMiddleware('jwt'), async (req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }else{
        const user= req.user;
        const cart= await CartsController.populate(user.cart);
        if(!cart){
            const products= await ProductController.getProducts();
            res.render('profile',{products: products.map(pro=>pro.toJSON()), title: 'Bienvenido/a',user:user})
        }else{
            res.render('current',{products:cart.products.map(pro=>pro.toJSON()),title:'Tu Carrito de compras',user:user,quantity:cart.quantity})
        }
    }
})

router.get('/password-recover',async (req,res)=>{
    const {token}=req.query;
    verifyToken(token)
    .then((userT)=>{
        res.render('recover',{token,title:'Recover password'});
    }).catch((error)=>{
        return res.redirect('/login')
    })
})

router.get('/password-change',(req,res)=>{
    res.render('forgot',{title: 'Change Password'});
})

export default router;