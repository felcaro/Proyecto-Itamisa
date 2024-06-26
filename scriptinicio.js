$(document).ready(function () {
  var cocktailIds = [11007, 17216, 17830, 11000, 11002, 11004, 11008, 11010, 11012, 11014, 11001, 11005];

  cocktailIds.forEach(function (cocktailId) {
    fetchCocktailDetails(cocktailId);
  });

  function fetchCocktailDetails(cocktailId) {
    var url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId;
    $.getJSON(url, function (data) {
      if (data.drinks) {
        var cocktail = data.drinks[0];
        var cardHtml = createCocktailCardHtml(cocktail);
        $(".cocktail-container").append(cardHtml);
      } else {
        console.log("No se encontraron datos de cócteles en la respuesta de la API para el ID: " + cocktailId);
      }
    });
  }

  function createCocktailCardHtml(cocktail) {
    var cardHtml = `
          <div class='card'>
              <div class='card-inner'>
                  <div class='card-front'>
                      <img src='${cocktail.strDrinkThumb}' alt='${cocktail.strDrink}'>
                  </div>
                  <div class='card-back'>
                      <h2>${cocktail.strDrink}</h2>
                      <p>Ingredientes:</p>
                      <ul>`;

    for (var i = 1; i <= 15; i++) {
      var ingredient = cocktail["strIngredient" + i];
      var measure = cocktail["strMeasure" + i];
      if (ingredient && measure) {
        cardHtml += `<li>${measure} ${ingredient}</li>`;
      } else if (ingredient) {
        cardHtml += `<li>${ingredient}</li>`;
      } else {
        break;
      }
    }

    cardHtml += `
                      </ul>
                  </div>
              </div>
          </div>`;

    return cardHtml;
  }

});


$(document).ready(function () {
  $('.carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});



// no perder focus en dropdown-menu
document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  dropdownToggle.addEventListener('click', function () {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  dropdownMenu.addEventListener('mouseleave', function () {
    dropdownMenu.style.display = 'none';
  });
});


// MENU PARA EL MENU
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNav = document.querySelector('.mobile-nav');

mobileMenu.addEventListener('click', () => {
  mobileNav.classList.toggle('show-menu');
});




const botonCambiarCiudad = document.getElementById('boton-cambiar-ciudad');
const menuCiudades = document.getElementById('menu-ciudades');
const overlay = document.querySelector('.overlay');
const contenedor = document.querySelector('.contenedor');
const listaCiudades = document.getElementById('lista-ciudades');
const ciudadTexto = document.getElementById('ciudad-texto');
const ciudades = ['Santiago', 'Viña del Mar', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Iquique', 'Rancagua', 'Talca'];

// Función para llenar el select con las ciudades
function llenarListaCiudades() {
  ciudades.forEach(ciudad => {
    const opcion = document.createElement('option');
    opcion.value = ciudad;
    opcion.textContent = ciudad;
    listaCiudades.appendChild(opcion);
  });
}

// Evento para mostrar el menú de ciudades
botonCambiarCiudad.addEventListener('click', () => {
  menuCiudades.style.display = 'block';
  overlay.classList.add('visible');
  contenedor.classList.add('opacado');
});

// Evento para ocultar el menú de ciudades
document.getElementById('boton-cerrar').addEventListener('click', () => {
  menuCiudades.style.display = 'none';
  overlay.classList.remove('visible');
  contenedor.classList.remove('opacado');
});

// Evento para actualizar la ciudad seleccionada
document.getElementById('boton-aplicar').addEventListener('click', () => {
  const ciudadSeleccionada = listaCiudades.value;
  ciudadTexto.textContent = ciudadSeleccionada;
  menuCiudades.style.display = 'none';
  overlay.classList.remove('visible');
  contenedor.classList.remove('opacado');
});

// Llamar a la función para llenar el select al cargar la página
llenarListaCiudades();



const modal = document.getElementById('modal-edad');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');

// Mostrar el modal al cargar la página
window.onload = function () {
  modal.style.display = 'block';
}

// Ocultar el modal y permitir acceso al contenido si el usuario es mayor de edad
btnSi.onclick = function () {
  modal.style.display = 'none';
}

// Bloquear el acceso al contenido si el usuario no es mayor de edad
btnNo.onclick = function () {
  alert('Debes ser mayor de edad para acceder a este contenido.');
}

//carrito 
const cartIcon = document.getElementById('cart-icon');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartButton = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');
const cartCount = document.getElementById('cart-count');
const realizarCompraButton = document.getElementById('realizar-compra');

let cart = [];

// Función para abrir el carrito
function abrirCarrito() {
  cartOverlay.style.display = 'block';
  renderizarCarrito();
}

function cerrarCarrito() {
  cartOverlay.style.display = 'none';
}

function agregarAlCarrito(producto) {
  cart.push(producto);
  actualizarContadorCarrito();
  renderizarCarrito();
}

// Función para renderizar el carrito
function renderizarCarrito() {
  cartItems.innerHTML = '';
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

    //eliminar el producto del carrito
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
      cerrarCarrito();
    }, 500);
  }, 1500);

  // Vaciar el carrito después de la compra exitosa
  vaciarCarrito();
}



const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
const selectedLocation = document.getElementById('selected-location');

// Función para abrir el menú desplegable
function openDropdown() {
  dropdownMenu.classList.remove('hidden');
}

// Función para cerrar el menú desplegable
function closeDropdown() {
  dropdownMenu.classList.add('hidden');
}

// Función para seleccionar una ubicación
function selectLocation(location) {
  selectedLocation.textContent = location;
  closeDropdown();
}

// Evento de clic en el botón para abrir el menú
dropdownToggle.addEventListener('click', openDropdown);

// Evento de clic fuera del menú para cerrarlo
window.addEventListener('click', function (event) {
  if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
    closeDropdown();
  }
});


// Función para procesar la respuesta de la API y mostrar las opciones de ubicación
function displayLocations(data) {
  // Limpiar el contenido anterior del menú
  dropdownMenu.innerHTML = '';

  if (data.locations.length === 0) {
    // Si no hay ubicaciones, mostrar un mensaje
    const noLocationsMessage = document.createElement('p');
    noLocationsMessage.textContent = 'No se encontraron ubicaciones.';
    dropdownMenu.appendChild(noLocationsMessage);
  } else {
    // Si hay ubicaciones, crear la lista
    const locationList = document.createElement('ul');
    data.locations.forEach(location => {
      const locationItem = document.createElement('li');
      locationItem.textContent = `${location.city}, ${location.country}`;
      locationItem.addEventListener('click', () => selectLocation(`${location.city}, ${location.country}`));
      locationList.appendChild(locationItem);
    });
    dropdownMenu.appendChild(locationList);
  }
}



const emailInput = document.getElementById('email-input');
const subscribeButton = document.getElementById('subscribe-button');

// Reemplaza estas variables con tus claves de servicio de EmailJS
const serviceID = 'service_niu6kwc';
const templateID = 'template_kio32lm';
const publicKey = 'PJlgqsnKcxvLYaGMI';

// Inicializar EmailJS
emailjs.init(publicKey);

function sendSubscriptionEmail() {
  const email = emailInput.value.trim();
  if (email) {
    const templateParams = {
      from_email: email,
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then(() => {
        alert('¡Te has suscrito exitosamente!');
        emailInput.value = '';
      })
      .catch((error) => {
        console.error('Error al suscribirse:', error);
        alert('Ocurrió un error al suscribirse. Por favor, inténtalo de nuevo más tarde.');
      });
  } else {
    alert('Por favor, ingresa un correo electrónico válido.');
  }
}
