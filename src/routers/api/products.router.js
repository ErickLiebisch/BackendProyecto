import ProductController from "../../controllers/products.controller.js";
import { Router } from "express";
import { buildResponsePaginated,StrategyMiddleware,authMiddleware } from "../../utils.js";

const router= Router();


router.get('/products',async (req,res)=>{
   const {limit=5,page=1,sort,search}=req.query;
   const criteria={};
   const options= {limit,page}
   
   if(sort){
    options.sort={price:sort}
   }
   if(search){
    criteria.category=search;
   }
   const result= await ProductController.paginate(criteria,options);
   res.status(200).json(buildResponsePaginated({...result,sort,search}));


})
router.get('/products/:id',async (req,res)=>{
    const {id}= req.params;
    //const product = await productmanager.getProductById(parseInt(id));
    const product= await ProductController.getProductById(id)
    if(!product){
        res.status(404).json({error: 'Product not found'})
    }else{
        res.status(200).json(product);
    }
})

router.post('/products',StrategyMiddleware('jwt'),authMiddleware(['admin']),async (req,res)=>{
    const {body}=req;
    //await productmanager.addProduct('producto prueba 12',"Este es un producto prueba",101,["Sin imagen"],"p12",5);
    //const products=await productmanager.getProducts();
    const products= await ProductController.addProduct(body);
    res.status(201).json(products);
});
router.put('/products/:id', StrategyMiddleware('jwt'),authMiddleware(['admin']),async (req,res)=>{
    const {id}= req.params;
    const {body}=req;
    
    //     if(body.title){
    //         await productmanager.updateProduct(parseInt(id),'title',body.title);
    //     }else{
    //         console.log('title wont be changed')
    //     }
    //     if(body.description){
    //         await productmanager.updateProduct(parseInt(id),'description',body.description);
    //     }else{
    //         console.log('description wont be changed')
    //     }
    //     if(body.price){
    //         await productmanager.updateProduct(parseInt(id),'price',body.price);
    //     }else{
    //         console.log('price wont be changed')
    //     }
    //     if(body.thumbnail){
    //         await productmanager.updateProduct(parseInt(id),'thumbnail',body.thumbnail);
    //     }else{
    //         console.log('thumbnail wont be changed')
    //     }
    //     if(body.code){
    //         await productmanager.updateProduct(parseInt(id),'code',body.code);
    //     }else{
    //         console.log('code wont be changed')
    //     }
    //       if(body.status){
    //       await productmanager.updateProduct(parseInt(id),'status',body.status);
    //       }else{
    //      console.log('status wont be changed')
    //       }
    //     if(body.stock){
    //         await productmanager.updateProduct(parseInt(id),'stock',body.stock);
    //     }else{
    //         console.log('stock wont be changed')
    //     }
    
    // const product= await productmanager.getProductById(parseInt(id));
    //res.status(200).json(product);
    const product= await ProductController.getProductById(id);
    if(!product){
        res.status(404).json({error:'Producto no encontrado'})
    }else{
        await ProductController.updateProductById(id,body);
        res.status(204).end();

    }
    
})
router.delete('/products/:id',StrategyMiddleware('jwt'),authMiddleware(['admin']),async (req,res)=>{
    const {id}= req.params;
    //await productmanager.deleteProduct(parseInt(id));
    //const products= await productmanager.getProducts();
    //res.status(200).json(products);
    await ProductController.deleteProductById(id);
    res.status(204).end();
    
    
})
    



export default router;