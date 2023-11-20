import express from "express";
import ProductManager from "./ProductManager.js"
const productmanager= new ProductManager("Products.js")

const app= express();
const PORT= 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.status(200).json({message: "Hola, bienvenido a mi ecommerce"})

})
app.get('/products',async (req,res)=>{
    const {query}= req;
    const {limit}= query;
    const products= await productmanager.getProducts();
    if(!limit){
        res.status(200).json(products);
    }else{
        const response= products.slice(0,parseInt(limit));
        res.status(200).json(response);

    }


})
app.get('/products/:id',async (req,res)=>{
    const {id}= req.params;
    const product = await productmanager.getProductById(parseInt(id));
    if(!product){
        res.status(404).json({error: 'Product not found'})
    }else{
        res.status(200).json(product);
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running in http://localhost:${PORT}`);
})