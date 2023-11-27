import ProductManager from "../../ProductManager.js";
import { Router } from "express";
const productmanager=new ProductManager("Products.js")
const router= Router();

router.get('/products',async (req,res)=>{
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
router.get('/products/:id',async (req,res)=>{
    const {id}= req.params;
    const product = await productmanager.getProductById(parseInt(id));
    if(!product){
        res.status(404).json({error: 'Product not found'})
    }else{
        res.status(200).json(product);
    }
})

router.post('/products',async (req,res)=>{
    await productmanager.addProduct('producto prueba 12',"Este es un producto prueba",101,["Sin imagen"],"p12",5);
    const products=await productmanager.getProducts();
    res.status(201).json(products);
});
router.put('/products/:id', async (req,res)=>{
    const {id}= req.params;
    const {body}=req;
    
        if(body.title){
            await productmanager.updateProduct(parseInt(id),'title',body.title);
        }else{
            console.log('title wont be changed')
        }
        if(body.description){
            await productmanager.updateProduct(parseInt(id),'description',body.description);
        }else{
            console.log('description wont be changed')
        }
        if(body.price){
            await productmanager.updateProduct(parseInt(id),'price',body.price);
        }else{
            console.log('price wont be changed')
        }
        if(body.thumbnail){
            await productmanager.updateProduct(parseInt(id),'thumbnail',body.thumbnail);
        }else{
            console.log('thumbnail wont be changed')
        }
        if(body.code){
            await productmanager.updateProduct(parseInt(id),'code',body.code);
        }else{
            console.log('code wont be changed')
        }
          if(body.status){
          await productmanager.updateProduct(parseInt(id),'status',body.status);
          }else{
         console.log('status wont be changed')
          }
        if(body.stock){
            await productmanager.updateProduct(parseInt(id),'stock',body.stock);
        }else{
            console.log('stock wont be changed')
        }
    
    const product= await productmanager.getProductById(parseInt(id));
    res.status(200).json(product);

})
router.delete('/products/:id',async (req,res)=>{
    const {id}= req.params;
    await productmanager.deleteProduct(parseInt(id));
    const products= await productmanager.getProducts();
    res.status(200).json(products);
})
    



export default router;