function toBe() {
    const socket = io();
    document.getElementById('form-products').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('input-title');
        const description = document.getElementById('input-description');
        const price = document.getElementById('input-price');
        const thumbnail = document.getElementById('input-thumbnail');
        const code = document.getElementById('input-code');
        const stock = document.getElementById('input-stock');
        const category = document.getElementById('input-category');

        const newProduct = {
            title: title.value,
            description: description.value,
            price: price.value,
            thumbnail: thumbnail.value,
            code: code.value,
            stock: stock.value,
            category: category.value,
        }

        socket.emit('newProduct', newProduct);

        title = '';
        description = '';
        price = '';
        thumbnail = '';
        code = '';
        stock = '';
        category = '';
        title.focus();
    })

    document.getElementById('form-delete').addEventListener('submit', (event)=>{
        event.preventDefault();
        const deleteId=document.getElementById('input-delete');
        socket.emit('deleteProduct',deleteId.value);
        deleteId.value='';
        deleteId.focus();
    })
    socket.emit('notification','Holi');
    socket.on('init',(data)=>{
        console.log('event init',data);
    })
    socket.on('start',(data)=>{
        console.log('start',data)
    })
    socket.on('message',(data)=>{
        console.log('message',data)
    })
    socket.on('productList',(products)=>{
        console.log('products',products);
        const productlog= document.getElementById('product-log');
        productlog.innerHTML='';
        products.forEach((data) => {
            const div= document.createElement('div');
        div.innerHTML=`
        <div class="infoProduct">
        <span class="product-title">Title: ${data.title}</span>
        <span class="product-description">description: ${data.description}</span>
        <span class="product-price">price: ${data.price}</span>
        <span class="product-thumbnail">thumbnail: ${data.thumbnail}</span>
        <span class="product-code">code: ${data.code}</span>
        <span class="product-status">status: ${data.status}</span>
        <span class="product-stock">stock: ${data.stock}</span>
        <span class="product-id">id: ${data.id}</span>
        
        </div>
        
        
        `
        productlog.appendChild(div);
        });
        
    })
}
toBe();