// Obtener los formularios
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Función para validar el formulario de inicio de sesión
function validateLoginForm(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Aquí puedes agregar tu lógica de validación
  // Por ejemplo, puedes verificar si el usuario y la contraseña son correctos
  if (username === 'admin' && password === 'admin') {
    alert('Inicio de sesión exitoso');
    // Aquí puedes agregar tu lógica después de un inicio de sesión exitoso
  }







 // Obtener todos los elementos de las tarjetas de cervezas
const beerCards = document.querySelectorAll('.beer-card');

// Función para animar las tarjetas al entrar en la vista
function animateBeerCards() {
  beerCards.forEach((card, index) => {
    // Agregar un pequeño retraso a cada tarjeta para que se animen de forma escalonada
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Verificar si las tarjetas están en la vista al cargar la página
window.addEventListener('load', () => {
  animateBeerCards();
});

// Verificar si las tarjetas entran en la vista al hacer scroll
window.addEventListener('scroll', () => {
  beerCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

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
