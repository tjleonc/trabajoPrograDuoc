//variables
let card = document.querySelector('.productos');
let containerBuyCart = document.querySelector('.modal-body');
let cartModalInstance;
let amountProduct = document.querySelector('.contador');

let modalCarro = [];
let countProduct = 0;
//funciones
loadEventListener();

function loadEventListener(){
    card.addEventListener('click', addProduct);
    document.querySelector('.carrito').addEventListener('click', showCart);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('agregarCarrito')){
/*         console.log(e.target.parentElement) */
        const selectedProduct = e.target.parentElement;
        readContent(selectedProduct);
    }
}

function readContent(product){
    const precioText = product.querySelector('.precio').textContent;
    const precio = parseInt(precioText.replace('$', ''));

    if (!isNaN(precio)) { // Verifica si el precio parseado es un número válido
        // El precio es un número válido, continúa con el procesamiento del producto
        const infoProduct = {
            id: product.querySelector('.agregarCarrito').getAttribute('data-id'),
            titulo: product.querySelector('h3').textContent,
            precio: precio,
            cantidad: 1
        };
        
        const exist = modalCarro.some(product => product.id === infoProduct.id);
    if(exist){
        modalCarro = modalCarro.map(product => {
            if(product.id === infoProduct.id){
                product.cantidad++;
                return product;
            }else{
                return product;
            }
        });
    }else{
        modalCarro = [...modalCarro, infoProduct]
        countProduct++;
    }
    loadHTML();
    } else {
        // El precio no es un número válido, maneja este caso adecuadamente
        console.error('El precio del producto no es un número válido:', precioText);
        // Puedes mostrar un mensaje de error al usuario o ignorar este producto
    }
}




function loadHTML(){
    containerBuyCart.innerHTML = '';
    modalCarro.forEach(product => {
        const {id, titulo, precio, cantidad} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
        <div class="item-content">
        <h5>${titulo}</h5>
        <h5>${precio}</h5>
        <h6>Cantidad: ${cantidad}</h6>
        <span class="borrar-item" data-id="${id}">Borrar</span>
        </div>
        `;
        containerBuyCart.appendChild(row);

        amountProduct.textContent = countProduct;

    });

}

function clearHTML(){
    containerBuyCart.innerHTML = '';
}

function showCart(e) {
    e.preventDefault();
    if (!cartModalInstance) {
        cartModalInstance = new bootstrap.Modal(document.getElementById('cartModal'), {
            keyboard: true
        });
    }
    cartModalInstance.show();
}

function deleteProduct(e) {
    if (e.target.classList.contains('borrar-item')) {
        const productId = e.target.getAttribute('data-id');
        modalCarro = modalCarro.filter(product => product.id !== productId);
        loadHTML();
    }
    countProduct--
    amountProduct.innerHTML = countProduct;
}
