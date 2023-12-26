import { Router } from "express";
import productModel from "../../dao/models/product-model.js";
import { buildResponsePaginatedV } from "../../utils.js";

const router=Router();


router.get('/products', async (req,res)=>{
    const {limit=5,page=1,sort,search}=req.query;
    const criteria={};
    const options= {limit,page}
    
    if(sort){
     options.sort={price:sort}
    }
    if(search){
     criteria.category=search;
    }
    const result= await productModel.paginate(criteria,options);
    const data= buildResponsePaginatedV({...result,search});
    res.render('productlist',{title:'La tiendita de erick',...data});
 
});

export default router