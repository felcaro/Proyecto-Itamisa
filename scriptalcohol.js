const cartIcon = document.getElementById('cart-icon');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartButton = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');
const cartCount = document.getElementById('cart-count');

let cart = [];

// Función para abrir el carrito
function abrirCarrito() {
  cartOverlay.style.display = 'block';
  renderizarCarrito();
}

// Función para cerrar el carrito
function cerrarCarrito() {
  cartOverlay.style.display = 'none';
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  cart.push(producto);
  actualizarContadorCarrito();
  renderizarCarrito();
}

// Función para renderizar el carrito
function renderizarCarrito() {
  cartItems.innerHTML = ''; // Limpiar el contenido previo del carrito
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item-container');
    cartItem.innerHTML = `
      <div class="cart-item-image-container">
        <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
      </div>
      <div class="cart-item-info">
        <h4>${item.nombre}</h4>
        <p class="cart-item-price">Precio: $${item.precio} <span class="discount">-${item.descuento}%</span> = $${item.precio * (1 - item.descuento / 100)}</p>
      </div>
      <button class="remove-item-btn" data-index="${index}">Eliminar</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.precio * (1 - item.descuento / 100);

    // Evento click para eliminar el producto del carrito
    cartItem.querySelector('.remove-item-btn').addEventListener('click', (e) => {
      const itemIndex = e.target.dataset.index;
      cart.splice(itemIndex, 1);
      actualizarContadorCarrito();
      renderizarCarrito();
    });
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
  cart = [];
  actualizarContadorCarrito();
  renderizarCarrito();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  cartCount.textContent = cart.length;
}

// Evento click para abrir el carrito
cartIcon.addEventListener('click', abrirCarrito);

// Evento click para cerrar el carrito
closeCartButton.addEventListener('click', cerrarCarrito);

// Evento click para vaciar el carrito
clearCartButton.addEventListener('click', vaciarCarrito);

// Agregar eventos de clic a los botones "Agregar" de los productos
const addToCartButtons = document.querySelectorAll('.product-card button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const producto = JSON.parse(button.dataset.producto);
    agregarAlCarrito(producto);
  });
});

function realizarCompra() {
  // Lógica para procesar el pago y completar la compra
  // ...

  // Mostrar animación de "Gracias por su compra"
  const animacion = document.createElement('div');
  animacion.classList.add('compra-exitosa');
  animacion.textContent = 'Gracias por su compra!';
  document.body.appendChild(animacion);

  setTimeout(() => {
    animacion.classList.add('mostrar');
  }, 100);

  setTimeout(() => {
    animacion.classList.remove('mostrar');
    setTimeout(() => {
      document.body.removeChild(animacion);
      cerrarCarrito(); // Cerrar el carrito después de la compra exitosa y la animación
    }, 500);
  }, 3000);

  // Vaciar el carrito después de la compra exitosa
  vaciarCarrito();
}



// no perder focus en dropdown-menu
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  dropdownToggle.addEventListener('click', function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  dropdownMenu.addEventListener('mouseleave', function() {
    dropdownMenu.style.display = 'none';
  });
});


const toggleFilters = document.getElementById('toggle-filters');
const sidebar = document.getElementById('sidebar');

toggleFilters.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});


function realizarCompra() {
  // Lógica para procesar el pago y completar la compra
  // ...

  // Mostrar animación de "Gracias por su compra"
  const animacion = document.createElement('div');
  animacion.classList.add('compra-exitosa');
  animacion.textContent = 'Gracias por su compra!';
  document.body.appendChild(animacion);

  setTimeout(() => {
    animacion.classList.add('mostrar');
  }, 100);

  setTimeout(() => {
    animacion.classList.remove('mostrar');
    setTimeout(() => {
      document.body.removeChild(animacion);
    }, 500);
  }, 3000);

  // Vaciar el carrito después de la compra exitosa
  vaciarCarrito();
}
