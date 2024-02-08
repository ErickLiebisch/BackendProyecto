import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import indexRouter from './routers/views/index.router.js'
import ProductRouter from "./routers/api/products.router.js"
import CartRouter from "./routers/api/carts.router.js"
import appRouter from "./routers/views/app.router.js"
import PRouter from "./routers/views/products.router.js"
import CRouter from "./routers/views/carts.router.js"
import sessionRouter from "./routers/api/session.router.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import { URI } from "./utils.js";
import passport from "passport";
import { init as initPassport} from './config/passport.config.js'
import config from "./config/config.js";

const SESSION_SECRET=config.sessionSecret;

const app= express();


app.use(session({
    store:MongoStore.create({
        mongoUrl:URI,
        mongoOptions:{},
        ttl:3600,
    }),
    secret: SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter, appRouter, PRouter, CRouter);
app.use('/api',ProductRouter,CartRouter, sessionRouter);

// app.listen(PORT, ()=>{
//     console.log(`Server running in http://localhost:${PORT}`);
// })

export default app;