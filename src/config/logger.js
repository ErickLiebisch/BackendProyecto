import winston from "winston"
import config from "./config.js";
const customLevelOpts={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors: {
        fatal:'red',
        error:'red',
        warning:'yellow',
        info:'blue',
        http:'gray',
        debug:'cyan',

    },
}

export const loggerDev= winston.createLogger({
    levels:customLevelOpts.levels,
    transports:[
        new winston.transports.Console({
            level:'debug',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOpts.colors}),
                winston.format.simple(),
                ),
               
        }),
    ],
});

export const loggerProd= winston.createLogger({
    transports:[
        new winston.transports.Console({
            level:'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOpts.colors}),
                winston.format.simple(),
                ),
               
        }),
        new winston.transports.File({
            filename:'./errors.log',
            level:'error',
            format:winston.format.simple(),
        
        }),
    ],
});

export const logger=config.env==='production'?loggerProd:loggerDev;

export const addLogger=(req,res,next) =>{
    req.logger=logger;
    next();
};