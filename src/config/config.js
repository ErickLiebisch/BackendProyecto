import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 3030 ,
    mongoDBURI: process.env.MONGODB_URI || 'http://localhost:8080',
    sessionSecret: process.env.SESSION_SECRET || "EDHZHCHFGSGX" ,
    clientID: process.env.CLIENT_ID || '1234',
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080',
    jwt: process.env.JWT_SECRET || '',
    persistence: process.env.PERSISTENCE || 'mongodb',
    clientSecret: process.env.CLIENT_SECRET || '',
    env:process.env.NODE_ENV || 'development',
}