import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import http from 'http';
import { __dirname } from "../src/utils.js";
import indexRouter from '../src/routers/views/index.router.js'
import ProductRouter from "../src/routers/api/products.router.js"
import CartRouter from "../src/routers/api/carts.router.js"
import appRouter from "../src/routers/views/app.router.js"
import PRouter from "../src/routers/views/products.router.js"
import CRouter from "../src/routers/views/carts.router.js"
import sessionRouter from "../src/routers/api/session.router.js"
import passport from "passport";
import { init as initPassport} from '../src/config/passport.config.js'
import config from "../src/config/config.js";
import cookieParser from "cookie-parser";
import { initMongoDB } from "../src/db/mongodb.js";
import ProductsService from "../src/services/products.service.js";
import CartsService from "../src/services/carts.service.js";
import UsersService from "../src/services/users.service.js";

const SESSION_SECRET=config.sessionSecret;

const app= express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
initPassport();
app.use(passport.initialize());

app.use('/', indexRouter, appRouter, PRouter, CRouter);
app.use('/api',ProductRouter,CartRouter, sessionRouter);

await initMongoDB();

const server= http.createServer(app);
initMongoDB(server);

const PORT=config.port;
server.listen(PORT, ()=>{
    console.log(`server running on: http://localhost:${PORT}`);
});

async function test(){
    let testOK=0;
    let testFailed=0;    
    let resultP= await ProductsService.getAll();
    let resultC= await CartsService.getAll();
    let resultU= await UsersService.getAll();
    if(resultP===null || resultC===null || resultU===null){
        console.log("Error to access database")
        testFailed++;
    }else{
        console.log(resultP);
        console.log("------------------")
        console.log(resultC);
        console.log("------------------")
        console.log(resultU);
        console.log("------------------")
        testOK++;
    }
    resultP=await ProductsService.getById('6589fda50486425c00df9f6f');
    resultC=await CartsService.getById('65b817aea7ab8936579ad872');
    resultU=await UsersService.getById('659d65872590506b4eb184f1');
    
    if(resultP===null || resultC===null || resultU===null){
        console.log("Error search in database")
        testFailed++;
    }else{
        console.log(resultP);
        console.log("------------------")
        console.log(resultC);
        console.log("------------------")
        console.log(resultU);
        console.log("------------------")
        testOK++;
    }
    resultP={
        title: "producto test",
        description: "es un test",
        price: 101,
        thumbnail: [
            "No image"
        ],
        code: "t0",
        status: false,
        stock: 12,
        category: "producto test"
    };
    resultC={
    products:[]
    };
    resultU={   
    first_Name:"test",
    last_Name:"user",
    email:"test@mail.com",
    age:31,
    role:"user"
    };
    await ProductsService.update('6589fda50486425c00df9f6f',resultP);
    await CartsService.update('65b817aea7ab8936579ad872',resultC);
    await UsersService.update('659d65872590506b4eb184f1',resultU);
    testOK++;
    
    await ProductsService.delete('6589fe750486425c00df9f7e');
    await CartsService.delete('65c5651ce37d9bd15c6b90db');
    await UsersService.delete('65b817aea7ab8936579ad874');
    testOK++;
    
    
    
    console.log("Test aprovado:"+testOK);
    console.log("Test Fallido:"+testFailed);
    }

    test();