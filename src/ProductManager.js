class ProductManager{
constructor(){
    this.products=[]
}
addProduct(title,description,price,thumbnail,code,stock){
const product={
    title:title,
    decription:description,
    price:price,
    thumbnail:thumbnail,
    code:code,
    stock:stock,
    id: Date.now(),
}
const oldProduct= this.products.find((pro)=>title===pro.title && description=== pro.description && price===pro.price && thumbnail===pro.thumbnail && code===pro.code && stock===pro.stock);
if(!title || !description || !price || !thumbnail || !code || !stock ) {
    console.log("Please fill all information")
}else if(!oldProduct){
    this.products.push(product)
}else{
    console.log("product repeated")
}
}
getProducts(){
    if(!this.products){
        console.log("there is no products")
    }else{
        console.log(this.products)
        return this.products;
    }
    
}
getProductById(id){
    const product= this.products.find((pro)=>id===pro.id)
    if(!product){
        console.log("not found")
    }else{
        return product
    }

}
}
function test() {
    const productmanager= new ProductManager();
    productmanager.getProducts();
    productmanager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
    productmanager.getProducts();
    productmanager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
    productmanager.getProductById(1);
    const productos=productmanager.getProducts(); 
    const producto=productos[0];
    productmanager.getProductById(producto.id);
}
test();