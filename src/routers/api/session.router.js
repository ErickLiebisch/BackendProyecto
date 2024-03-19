import { Router } from "express";
import UsersController from "../../controllers/users.controller.js";
import { error } from "console";
import passport from "passport";
import { StrategyMiddleware, authMiddleware, createHash, isValidPassword, generateToken, verifyToken } from "../../utils.js";
import cookieParser from "cookie-parser";
import UserDTO from "../../dto/user.dto.js";
import EmailService from "../../services/email.service.js";
import UserManager from "../../dao/MongoDB-managers/UserManager.js";
import userModel from "../../dao/models/user-model.js";


const router = Router();

router.post('/session/register', passport.authenticate('register', { failureRedirect: '/register', session: false }), async (req, res) => {
    //     const {
    //         body:{
    //             first_Name,
    //             last_Name,
    //             email,
    //             password,
    //             age,
    //         },
    //     }=req;
    // if( !first_Name ||
    //     !last_Name ||
    //     !email ||
    //     !password
    //     ){
    //         return res.status(400).json({message: 'please fill all entries'})
    //     }


    //         const user= await userModel.create({
    //             first_Name,
    //             last_Name,
    //             email,
    //             password,
    //             age,


    //         })
    res.redirect("/login");
}
)

router.post('/session/login', async (req, res) => {

    // router.post('/session/login', passport.authenticate('login',{failureRedirect:'/login'}),async(req,res) => {

    const { body: { email, password }, } = req;
    let user = {};

    if (!email || !password) {
        return res.status(400).json({ message: 'please fill all entries' })

    } else if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        user = {
            _id: id,
            first_Name: 'Admin',
            last_Name: 'Store',
            email: email,
            password: password,
            age: 26,
            role: 'admin',
        }
    } else {

        user = await UsersController.getOne({ email });
        if (!user) {
            return new Error('invalid email or password');
        }
        const pass = isValidPassword(password, user)
        if (!pass) {
            return new Error('invalid email or password');
        }

        const token = generateToken(user);
        res.cookie('token', token, {
            maxAge: 1000 * 60,
            httpOnly: true,
        })
        res.redirect('/profile')
    }
}

)

router.get('/session/profile', StrategyMiddleware('jwt'), (req, res) => {
    if (!req.user) {
        res.status(error.statusCode || 500).json({ status: 'error', message })
    }
    res.status(200).send(req.user);
});
router.get('/session/logout', (req, res) => {
    res.clearCookie();
    res.redirect('/login');
});


router.post('/session/password-change', async (req, res) => {
    const { body: { email }, } = req;
    const user = await UsersController.getOne({email});
    if (!user) {
        return new Error(' email o contraseña invalidos');
     }
    const token= generateToken(user,"password-change");
    const link= `http://localhost:8080/password-recover/?token=${token}`;
    const emailService= EmailService.getInstance();
    emailService.sendPassRecover(user,link);
    req.logger.info('email enviado');
    res.redirect('/login');
});
router.post('/session/password-recover', async (req, res) => {
    const { body: { password }, } = req;
    const {token}= req.query;
    const info= await verifyToken(token);
    const user= await UsersController.getOne({ email: info.email })

    if (!password) {
        //return res.status(400).json({ message: 'please fill all entries'})
        return res.render('error', { title: 'log error', messageError: 'please fill all entries' });
    }
    if (!user) {
        //return res.status(401).json({ message: 'invalid email or password'})
        return res.render('error', { title: 'log error', messageError: 'Password change failed' });
    }
    if(isValidPassword(password,user)){
        return res.render('error', { title: 'log error', messageError: 'Cannot use the same password as before' });
    }
    await userModel.updateOne({_id:user.id},{password:createHash(password)});
    //await UsersController.update(user.id,{password:createHash(password)});
    res.redirect('/login');
})


router.get('/session/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/session/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile');
})
router.get('/session/current', StrategyMiddleware('jwt'), authMiddleware(['user']), (req, res) => {
    if (!req.user) {
        res.status(error.statusCode || 500).json({ status: 'error', message })
    }
    res.status(200).send(req.user);
});

export default router