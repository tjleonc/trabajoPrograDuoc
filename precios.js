const abrirModal = document.querySelector('#abrirModal');
const abrirModal2 = document.querySelector('#abrirModal2');
const abrirModal3 = document.querySelector('#abrirModal3');
const cerrarModal = document.querySelector('#cerrarModal');
const cerrarModal2 = document.querySelector('#cerrarModal2');
const cerrarModal3 = document.querySelector('#cerrarModal3');
const modal = document.querySelector('#modal');
const modal2 = document.querySelector('#modal2');
const modal3 = document.querySelector('#modal3');
const agregarCarrito = document.querySelector('#agregarCarrito');
const agregarCarrito2 = document.querySelector('#agregarCarrito2');
const agregarCarrito3 = document.querySelector('#agregarCarrito3');

abrirModal.addEventListener('click', () => {
    modal.showModal();
});

cerrarModal.addEventListener('click', () => {
    modal.close();
});

abrirModal2.addEventListener('click', () => {
    modal2.showModal();
});

cerrarModal2.addEventListener('click', () => {
    modal2.close();
});

abrirModal3.addEventListener('click', () => {
    modal3.showModal();
});

cerrarModal3.addEventListener('click', () => {
    modal3.close();
});


