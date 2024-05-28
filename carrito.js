//variables
let card = document.querySelector('.productos');
let containerBuyCart = document.querySelector('.modal-body');
let cartModalInstance;
let amountProduct = document.querySelector('.contador');

let modalCarro = JSON.parse(localStorage.getItem('modalCarro')) || [];
if (!Array.isArray(modalCarro)) {
    // Si los datos recuperados no son un array, inicializar como un array vacío
    modalCarro = [];
}
let countProduct = JSON.parse(localStorage.getItem('countProduct')) || 0;
let totalCarro = 0;
//funciones
loadEventListener();
loadHTML();

function loadEventListener(){
    card.addEventListener('click', addProduct);
    document.querySelector('.carrito').addEventListener('click', showCart);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregarCarrito')) {
        if (countProduct < 10) { // Verifica si el carrito tiene menos de 10 productos, por algun razón me agrega solo 1 vez los productos y luego solo aumenta la cantidad, pero dejo el limite de 10 productos de todos modos
            const selectedProduct = e.target.parentElement;
            readContent(selectedProduct);
        } else {
            alert('No puedes agregar más de 10 artículos al carrito.');
        }
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
        loadHTML()
        countProduct--;
        amountProduct.innerHTML = countProduct;
    }
    saveCartToLocalStorage();
    updateItemCounter();

}


function saveCartToLocalStorage(){
    localStorage.setItem('modalCarro', JSON.stringify(modalCarro));
    localStorage.setItem('countProduct', JSON.stringify(countProduct));
}

function updateItemCounter() {
    const itemCount = modalCarro.reduce((total, product) => total + product.cantidad, 0);
    const contadorElement = document.querySelector('.contador');
    contadorElement.textContent = itemCount;
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML();
    updateItemCounter();
});