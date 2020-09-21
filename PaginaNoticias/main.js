document.querySelector('.menu-btn').addEventListener('click', agregarClase);

function agregarClase() {
     const menu = document.querySelector('.nav-menu');
     // toggle agrega o remueve la clase dependiendo si existe o no
     menu.classList.toggle('show');
}

ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-cards', {delay: 500});
ScrollReveal().reveal('.cards-banner-one', {delay: 500});
ScrollReveal().reveal('.cards-banner-two', {delay: 500});