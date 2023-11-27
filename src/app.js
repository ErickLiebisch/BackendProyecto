import express from "express";
import ProductRouter from "./routers/api/products.router.js"
import CartRouter from "./routers/api/carts.router.js"
const app= express();
const PORT= 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.status(200).json({message: "Hola, bienvenido a mi ecommerce"})

})
app.use('/api',ProductRouter,CartRouter);

app.listen(PORT, ()=>{
    console.log(`Server running in http://localhost:${PORT}`);
})