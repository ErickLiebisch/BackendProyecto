import { Router } from "express";
import ProductsManager from "../../dao/MongoDB-managers/ProductsManager.js";

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


export default router;