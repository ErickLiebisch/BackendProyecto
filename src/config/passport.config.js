import passport from "passport";
import {Strategy as localStrategy} from "passport-local";
import {Strategy as GithubStrategy} from "passport-github2";
import {Strategy as JWTStrategy,ExtractJwt} from "passport-jwt";
import userModel from "../dao/models/user-model.js";
import cartModel from "../dao/models/cart-model.js";
import CartsController from "../controllers/carts.controller.js";
import UsersController from "../controllers/users.controller.js";
import { createHash, isValidPassword, generateToken} from "../utils.js";
import config from "./config.js";

const cookieExtractor=(req)=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies.token;
    }
    return token;
}

export const init= () => {
    const JWT_SECRET=config.jwt;
    const jwtOptions={
        secretOrKey: JWT_SECRET,
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    };

    passport.use('jwt', new JWTStrategy(jwtOptions,(payload,done)=>{
        return done(null,payload);
    
    }))
    
const registerOpts ={
    usernameField: 'email',
    passReqToCallback: true,
};
passport.use('register', new localStrategy(registerOpts, async (req,email,password,done)=>{
    const {
        body: {
            first_Name,
            last_Name,
            age,
        },
    } = req;

    if(!first_Name || !last_Name){
        return done(new Error('llene todos los campos por favor'));
    }
    const user= await UsersController.getOne({email});
    if(user){
        return done(new Error('Un usuario con ese email ya existe'))
    }
    const newCart= await CartsController.createCart({
        products:[]
    })
    const newUser= await UsersController.create({
        first_Name,
        last_Name,
        email,
        password: createHash(password),
        age,
        cart: newCart._id,
    });
    done(null,newUser);
}));



// passport.use('login', new localStrategy({usernameField:'email'},async(email,password,done)=>{
//     const user= await UsersController.getOne({email});
//     if(!user){
//         return done(new Error('correo o contraseña inválidos'));
//     }
//     const pass= isValidPassword(password,user)
//     if(!pass){
//         return done(new Error('correo o contraseña inválidos')); 
//     }
//     done(null,user);
// }));
// passport.serializeUser((user,done)=>{
//    done(null,user._id);
// })
// passport.deserializeUser(async (uid,done)=>{
//     const user= await UsersController.getById(uid);
//     done(null,user);
// });

const githubOpts={
    clientID: config.clientID ,
    clientSecret:config.clientSecret,
    callbackURL:config.callbackURL,
};
passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshToken,profile,done)=>{
    const email= profile._json.email;
    let user= await UsersController.getOne({email});
    if(user){
        return done(null,user);
    }
    const newCart= await CartsController.createCart({
        products:[]
    })
    user={
        first_Name: profile._json.name,
        last_Name: '',
        email: email || '',
        password:'',
        age: 18,
        cart: newCart._id
    };
    const newUser= await UsersController.create(user);
    done(null,newUser);
}))
}