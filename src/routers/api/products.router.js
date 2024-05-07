import ProductController from "../../controllers/products.controller.js";
import { Router } from "express";
import { buildResponsePaginated,StrategyMiddleware,authMiddleware, generateProduct } from "../../utils.js";
import EmailService from "../../services/email.service.js";
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

router.post('/products',StrategyMiddleware('jwt'),authMiddleware(['admin','premium']),async (req,res)=>{
    const {body}=req;
    //await productmanager.addProduct('producto prueba 12',"Este es un producto prueba",101,["Sin imagen"],"p12",5);
    //const products=await productmanager.getProducts();
    const products= await ProductController.addProduct(body);
    if(user.role==="premium"){
        await ProductController.updateOwner(products._id,user.email);
    }
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
router.delete('/products/:id',StrategyMiddleware('jwt'),authMiddleware(['admin','premium']),async (req,res)=>{
    const {id}= req.params;
    //await productmanager.deleteProduct(parseInt(id));
    //const products= await productmanager.getProducts();
    //res.status(200).json(products);

    const product= await ProductController.getProductById(id)
        if (!product) {
            res.status(error.statusCode || 500).json({status:'error',message})
        } else if(user.role==="premium" && product.owner===user.email){
            //await productmanager.deleteProduct(parseInt(productId));
            //res.status(200).json({message:'the following product was deleted',productId});
            await ProductController.deleteProductById(id);
            const emailService = EmailService.getInstance();
            emailService.sendDeleteEmail(user,product);
            res.status(204).end();
        } else if(user.role==="premium" && product.owner!==user.email){
            req.logger.error('error cannot delete product')
        }
        else if(user.role==="admin"){
            await ProductController.deleteProductById(id);
            res.status(204).end();

        }else{
            req.logger.error('error cannot delete product')
        }

    
})

router.post('/mockingproducts',async (req,res)=>{
    let contador = 0;
    while (contador<100) {
        await ProductController.addProduct(generateProduct())
        contador++;
    }
    const productos= await ProductController.getProducts();
    res.status(201).json(productos);

})
    



export default router;