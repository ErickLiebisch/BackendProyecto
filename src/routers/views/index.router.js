import { Router } from "express";
import ProductsManager from "../../dao/MongoDB-managers/ProductsManager.js";
import cartModel from "../../dao/models/cart-model.js";

const router= Router();

router.get('/',(req,res)=>{
    res.render('index',{title:'Tiendita de Erick'})
});

router.get('/chat',(req,res)=>{
    res.render('chat',{title:'Chat de clientes'});
})

router.get('/profile', async (req,res) =>{
    if(!req.user){
        return res.redirect('/login')
    }else{
        const products = await ProductsManager.getProducts();
        res.render('profile', {products: products.map(pro=>pro.toJSON()), title:'Bienvenido/a de vuelta', user:req.user.toJSON()})
    }
})

router.get('/login', async (req,res)=>{
    res.render('login', {title:'Inicio de sesión'})
})
router.get('/register', async (req,res)=>{
    res.render('register',{title:'Registro'})
})
router.get('/password-recover',(req,res)=>{
    res.render('recover', {title: 'Recover password'});

})
router.get('/current', async (req,res)=>{
    if(!req.user){
        return res.redirect('/login')
    }else{
        const user= req.user;
        const cart= await cartModel.findOne({_id:user.cart}).populate('products.product');
        if(!cart){
            const products= await ProductsManager.getProducts();
            res.render('profile',{products: products.map(pro=>pro.toJSON()), title: 'Bienvenido/a',user:req.user.toJSON()})
        }else{
            res.render('current',{products:cart.products.map(pro=>pro.toJSON()),title:'Tu Carrito de compras',user:user.toJSON(),quantity:cart.quantity})
        }
    }
})


export default router;