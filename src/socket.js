import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";
const productmanager = new ProductManager('Products.js');
let socketServer;
export const init = (httpServer) => {
    socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        const products = await productmanager.getProducts();
        socketClient.emit('productList', products)
        console.log(`new socket client ${socketClient.id} connected to server`);
        socketClient.emit('init', { status: "OK" })
        socketClient.broadcast.emit('start', { status: "broadcasting" })
        socketClient.on('notification', (message) => {
            console.log(`Client sent a new message: ${message}`)
        })
        socketServer.emit('message', { status: 'on air' });
        socketClient.on('newProduct', async (producto) => {
            await productmanager.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.stock);
            const products = await productmanager.getProducts();
            socketServer.emit('productList', products);
        })
        socketClient.on('deleteProduct', async (pid) => {
            await productmanager.deleteProduct(parseInt(pid));
            const products = await productmanager.getProducts();
            socketServer.emit('productList', products);
        })

    })
}