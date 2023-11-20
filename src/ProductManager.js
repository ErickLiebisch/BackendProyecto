import * as fs from "fs";


class ProductManager{
constructor(path){
    this.path=path;
}
async addProduct(title,description,price,thumbnail,code,stock){
const products= await getJsonFromFile(this.path);
const oldProduct=products.find((pro)=>code===pro.code);
const product={
    title:title,
    decription:description,
    price:price,
    thumbnail:thumbnail,
    code:code,
    stock:stock,
    id: Date.now(),
}
if(!title || !description || !price || !thumbnail || !code || !stock ) {
    console.log("Please fill all information")
}else if(!oldProduct){
    products.push(product)
    await saveJsonInFile(this.path,products);
}else{
    console.log("product repeated")
}
}
getProducts(){
    if(!getJsonFromFile(this.path)){
        console.log("there is no products")
    }else{
        console.log(getJsonFromFile(this.path))
        return getJsonFromFile(this.path);
    }
    
}
async getProductById(id){
    const products= await getJsonFromFile(this.path)
    const product= products.find((pro)=>id===pro.id)
    if(!product){
        console.log("not found")
    }else{
        return product
    }

}
async updateProduct(id,change,value){
    const products= await getJsonFromFile(this.path);
    let product = this.getProductById(id);
    if(product){
        if(change==='title'){
            product.title=value;
            await saveJsonInFile(this.path,products)
        }else if(change==='description'){
            product.description=value;
            await saveJsonInFile(this.path,products)
        }else if(change==='price'){
            product.price=value;
            await saveJsonInFile(this.path,products)
        }else if(change==='thumbnail'){
            product.thumbnail=value;
            await saveJsonInFile(this.path,products)
        }else if(change==='code'){
            product.code=value;
            await saveJsonInFile(this.path,products)
        }else if(change==='stock'){
            product.stock=value;
            await saveJsonInFile(this.path,products)
        }else{
            console.log("Please enter a valid change")
        }
    }else{
        console.log("product to update not found")
    }
}
async deleteProduct(id){
    const products = await getJsonFromFile(this.path);
    const product=this.getProductById(id);
    if(!product || !products){
        console.log("there is no products")
    }else{
        const index= products.indexOf(product);
        products.splice(index,1);
        await saveJsonInFile(this.path,products);
        console.log("the product with the id: "+ id + "was deleted")
    }
}
}
const getJsonFromFile= async (path)=>{
    if(!fs.existsSync(path)){
        return [];
    }
    const content= await fs.promises.readFile(path,'utf-8');
    return JSON.parse(content);
};
const saveJsonInFile=(path,data)=>{
    const content= JSON.stringify(data,null,'\t');
    return fs.promises.writeFile(path,content,'utf-8')
}
//     async function test() {
//     const productmanager= new ProductManager('Products.js');
//     await productmanager.getProducts();
//     await productmanager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
//     await productmanager.getProducts();
//     await productmanager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
//     await productmanager.getProductById(1);
//     const productos= await productmanager.getProducts(); 
//     const producto= productos[0];
//     await productmanager.getProductById(producto.id);
//     await productmanager.updateProduct(producto.id,"title","producto")
//     await productmanager.addProduct("producto prueba","Este es un producto prueba 2",199,"Sin imagen","abc1234",15);
//     const productoBorrar=productos[1];
//     await productmanager.deleteProduct(productoBorrar.id);
//  }
//  test();


//     async function create() {
//         const productmanager= new ProductManager('Products.js');
//         await productmanager.addProduct("producto prueba 2","Este es un producto prueba",200,"Sin imagen","1",25);
//         await productmanager.addProduct("producto prueba 3","Este es un producto prueba",200,"Sin imagen","2",25);
//         await productmanager.addProduct("producto prueba 4","Este es un producto prueba",200,"Sin imagen","3",25);
//         await productmanager.addProduct("producto prueba 5","Este es un producto prueba",200,"Sin imagen","4",25);
//         await productmanager.addProduct("producto prueba 6","Este es un producto prueba",200,"Sin imagen","5",25);
//         await productmanager.addProduct("producto prueba 7","Este es un producto prueba",200,"Sin imagen","6",25);
//         await productmanager.addProduct("producto prueba 8","Este es un producto prueba",200,"Sin imagen","7",25);
//         await productmanager.addProduct("producto prueba 9","Este es un producto prueba",200,"Sin imagen","8",25);
//         await productmanager.addProduct("producto prueba 10","Este es un producto prueba",200,"Sin imagen","9",25);
//         await productmanager.getProducts();
//     }
// create();

 export default ProductManager;