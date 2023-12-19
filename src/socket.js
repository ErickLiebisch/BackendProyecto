import { Server } from "socket.io";
import ProductManager from "./dao/Fs-managers/ProductManager.js";
import ChatManager from "./dao/MongoDB-managers/ChatManager.js";
const productmanager = new ProductManager('Products.js');
let io;
export const init = (httpServer) => {
    io = new Server(httpServer);
    io.on('connection', async (socketClient) => {
        const products = await productmanager.getProducts();
        socketClient.emit('productList', products)
        console.log(`new socket client ${socketClient.id} connected to server`);
        socketClient.emit('init', { status: "OK" })
        socketClient.broadcast.emit('start', { status: "broadcasting" })
        socketClient.on('notification', (message) => {
            console.log(`Client sent a new message: ${message}`)
        })
        io.emit('message', { status: 'on air' });
        socketClient.on('newProduct', async (producto) => {
            await productmanager.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.stock);
            const products = await productmanager.getProducts();
            io.emit('productList', products);
        })
        socketClient.on('deleteProduct', async (pid) => {
            await productmanager.deleteProduct(parseInt(pid));
            const products = await productmanager.getProducts();
            io.emit('productList', products);
        })
        console.log(`Nuevo usuario en chat (${socketClient.id})`);
        const messages=await ChatManager.getMessages();
        socketClient.emit('update-messages',messages);
        socketClient.on('new-message',async (message) =>{
            await ChatManager.sendMessage(message);
            const messages= await ChatManager.getMessages();
            socketClient.emit('update-messages',messages)
        })

    })
}