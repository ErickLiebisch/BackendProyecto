import * as fs from "fs";

class CartManager{
    constructor(path){
        this.path=path
    }
    async createCart(){
        const carts= await getJsonFromFile(this.path);
        const newCart={
            id: Date.now()+1,
            products: [],
        };
        carts.push(newCart);
        await saveJsonInFile(this.path,carts);
    }
    getCarts() {
        return getJsonFromFile(this.path);
    }
    async getProductsFromCart(cid){
        const carts= await getJsonFromFile(this.path);
        const cart= carts.find(car=>car.id===cid);
        if(!cart){
            console.log('Cart not found')
        }else{
            return cart.products;
        }
    }
    async addProductsToCart(cid,pid,quantity){
        const carts= await getJsonFromFile(this.path)
        const cart= carts.find(car=>car.id===cid);
        const product= cart.products.find(pro=>pro.id===pid);
        if(!cart){
            console.log('Cart not found')
        }else if(product){
            product.quantity=product.quantity+quantity;
            await saveJsonInFile(this.path,carts);

        }else{
            const products=cart.products;
            const newProduct ={
                id:pid,
                quantity:quantity,
            }
            products.push(newProduct);
            await saveJsonInFile(this.path,carts);
            console.log('product added successfully');
        }
    }
}



const getJsonFromFile= async(path)=>{
    if(!fs.existsSync(path)){
        return [];
    }
    const content = await fs.promises.readFile(path,'utf-8');
    return JSON.parse(content);
    
}
const saveJsonInFile=(path,data)=>{
    const content =JSON.stringify(data,null,'\t');
    return fs.promises.writeFile(path,content,'utf-8');
}
export default CartManager;