import http from 'http';
import app from './app.js';
import { init } from './socket.js';
import config from './config/config.js';

import {initMongoDB} from './db/mongodb.js';

await initMongoDB();

const server= http.createServer(app);
init(server);

const PORT=config.port;
server.listen(PORT, ()=>{
    console.log(`server running on: http://localhost:${PORT}`);
})