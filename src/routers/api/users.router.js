import { Router } from "express";
import userController from "../../controllers/users.controller.js";
import { StrategyMiddleware, authMiddleware, createHash, isValidPassword, verifyToken, generateToken, authToken, uploader } from "../../utils.js";


const router = Router();

router.put('/users/premium/:uid', async (req, res) => {
    const { uid } = req.params;
    const user= await userController.getById(uid);
        if (!user) {
            res.status(error.statusCode || 500).json({status:'error',message})
        }else{
            if(user.role==='user'){
                if(user.documents.find(doc=>doc.name==="identification") && user.documents.find(doc=>doc.name==="address") && user.documents.find(doc=>doc.name==="account")){
                await userController.upgradePremium(uid); 
                }else{
                    req.logger.error("please upload all documents before becoming premium");
                }
            }else{
                await userController.upgradePremium(uid);
            }
            
            res.status(204).end(); 
        }
        
});
router.post('/users/:uid/documents/:typeFile',authToken,uploader.single('file'),async (req,res,next) =>{
    try {
        const {params:{uid},file,params:{typeFile}}=req
        await userController.uploadFile(uid,typeFile,file) ;
        res.status(204).end();
    } catch (error) {
        next(error)
    }
    })

export default router