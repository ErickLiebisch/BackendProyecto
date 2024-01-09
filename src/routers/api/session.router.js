import { Router } from "express";
import userModel from "../../dao/models/user-model.js";
import { error } from "console";


const router= Router();

router.post('/session/register',async(req,res)=>{
    const {
        body:{
            first_Name,
            last_Name,
            email,
            password,
            age,
        },
    }=req;
if( !first_Name ||
    !last_Name ||
    !email ||
    !password
    ){
        return res.status(400).json({message: 'please fill all entries'})
    }


        const user= await userModel.create({
            first_Name,
            last_Name,
            email,
            password,
            age,
            
        
        })
        res.redirect("/login");
    }
)

router.post('/session/login', async(req,res) => {
    const {body:{email,password},}=req;

    if(!email||!password){
        return res.status(400).json({message: 'please fill all entries'})

    }else if(email==="adminCoder@coder.com" && password==="adminCod3r123"){
        req.session.user={
            first_Name: "admin",
            last_Name: "coder",
            email: "adminCoder@coder.com",
        }
        
    res.redirect('/profile')
    }else{
        const user= await userModel.findOne({ email });
        if(!user){
            return res.status(401).json({message:'invalid email or password'});
        }
    const {
        first_Name,
        last_Name,
    }=user;
    req.session.user={
        first_Name,
        last_Name,
        email,
    }
    
    
    res.redirect('/profile')
    }

})

router.get('/session/profile',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({message:'No estas loggeado'})
    }
    res.status(200).json(req.session.user)
})
router.get('/session/logout',(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            return res.render('error',{title:'error de loggeo',messageError: error.message });
        }

        res.redirect('/login');
    })
})

export default router