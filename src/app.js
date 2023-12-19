import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import indexRouter from './routers/views/index.router.js'
import ProductRouter from "./routers/api/products.router.js"
import CartRouter from "./routers/api/carts.router.js"
import appRouter from "./routers/views/app.router.js"
const app= express();
//const PORT= 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
app.use('/', indexRouter, appRouter);
app.use('/api',ProductRouter,CartRouter);

// app.listen(PORT, ()=>{
//     console.log(`Server running in http://localhost:${PORT}`);
// })

export default app;