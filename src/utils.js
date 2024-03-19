import path, { resolve } from 'path';
import url from 'url';
import bcrypt from 'bcrypt';
import config from './config/config.js';
import JWT from 'jsonwebtoken';
import passport from 'passport';
import { error } from 'console';
import { faker } from '@faker-js/faker';
const __filename= url.fileURLToPath(import.meta.url);
export const __dirname=path.dirname(__filename);
export const URL_BASE='http://localhost:8080'
export const URI= config.mongoDBURI;

const JWT_SECRET=config.jwt;

export const createHash = (password) =>{
    const result = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
    return result;
}

export const isValidPassword = (password,user)=>{
    const result = bcrypt.compareSync(password, user.password);
    return result;
}

export const buildResponsePaginated= (data) =>{
    return{
        status: 'success',
        payload: data.docs.map((doc)=>doc.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage:data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage?`${URL_BASE}/api/products/?page=${data.prevPage}&limit=${data.limit}`: null,
        nextLink: data.hasNextPage?`${URL_BASE}/api/products/?page=${data.nextPage}&limit=${data.limit}`: null,
    }

    
}
export const buildResponsePaginatedV= (data) =>{
    return{
        status: 'success',
        payload: data.docs.map((doc)=>doc.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage:data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage?`${URL_BASE}/products/?page=${data.prevPage}&limit=${data.limit}`: null,
        nextLink: data.hasNextPage?`${URL_BASE}/products/?page=${data.nextPage}&limit=${data.limit}`: null,
    }
}
export const StrategyMiddleware=(strategy)=>(req,res,next)=>{
    passport.authenticate(strategy,{session:false},function (error,payload,info){
        if(error){
            return next(error)
        }
        if(!payload){
            return res.status(401).json({message:info.message?info.message:info.toString()});
        }
        req.user=payload;
        next();
    })(req,res,next);
}

export const authMiddleware= roles=>(req,res,next)=>{
    const {user}=req;
    if(!user){
        return res.status(401).json({message:'no autorizado'});
    }
    if(!roles.include(user.role)){
        return res.status(403).json({message:'acceso denegado'});
    }
    next();
}

export const authToken= async (req,res,next)=>{
    const accessToken= req.cookies['access_token'];
    if(!accessToken){
        return next(new Unauthorized('Unauthorized'));
    }
    const payload=await verifyToken(accessToken);
 if(payload.type!=='authentication'){
    return next(new Unauthorized('Unauthorized'));
 }
    req.user=payload;
    next();
}

export const generateToken= (user,type='authentication') =>{
    const payload={
        id: user._id,
        first_Name:user.first_Name,
        last_Name:user.last_Name,
        email:user.email,
        cart:user.cart,
        role:user.role,
        type,
    }
    return JWT.sign(payload,JWT_SECRET,{expiresIn:'1h'});
};


export const verifyToken= (token) =>{
    return new Promise((resolve)=>{
        JWT.verify(token,JWT_SECRET, (error,payload)=>{
            if(error){
                return resolve(false);
            }
            resolve(payload);
        });
    });
    
}

export class Exception extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }

   
}
export class BadRequestException extends Exception{
     constructor(message){
        super(message,400);
     }   
}

export class NotFound extends Exception{
    constructor(message){
       super(message,404);
    }   
}
export class Unauthorized extends Exception{
    constructor(message){
       super(message,401);
    }   
}
export class Forbidden extends Exception{
    constructor(message){
       super(message,403);
    }   
}

export const generateProduct=() =>{
    return{
       title: faker.commerce.productName(),
       description: faker.lorem.paragraph(),
       price:faker.commerce.price() ,
       thumbnail: faker.image.url(),
       code: faker.string.alphanumeric({length:3}),
       status: true,
       stock: faker.number.int({min:1, max:99}),
       category: faker.commerce.department() ,
    }
   };