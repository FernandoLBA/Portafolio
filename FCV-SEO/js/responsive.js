const hamburguesa = document.querySelector('.contenedor-ham-menu a');
const menu = document.querySelector('.menu-ul');
const redes = document.querySelector('.contenedor-redes');
const itemInicio = document.querySelector('#item-inicio');
const itemServicios = document.querySelector('#item-servicios');
const itemNosotros = document.querySelector('#item-nosotros');
const itemContacto = document.querySelector('#item-contacto');
const facebook = document.querySelector('.fa-facebook-square');
const instagram = document.querySelector('.fa-instagram');

eventListeners();

// Eventos
function eventListeners() {
     hamburguesa.addEventListener('click', mostrarMenu);
     itemInicio.addEventListener('click', ocultarMenu);
     itemServicios.addEventListener('click', ocultarMenu);
     itemNosotros.addEventListener('click', ocultarMenu);
     itemContacto.addEventListener('click', ocultarMenu);
     facebook.addEventListener('click', ocultarMenu);
     instagram.addEventListener('click', ocultarMenu);
}


function mostrarMenu() {
     const menuFlag = menu.classList.contains('menu-ul-mostrar');
     const redesFlag = redes.classList.contains('contenedor-redes-mostrar');

     if (menuFlag) {
          menu.classList.remove('menu-ul-mostrar');
          redes.classList.remove('contenedor-redes-mostrar');
     } else {
          menu.classList.add('menu-ul-mostrar');
          redes.classList.add('contenedor-redes-mostrar');
     }
}

function ocultarMenu(){
     menu.classList.remove('menu-ul-mostrar');
     redes.classList.remove('contenedor-redes-mostrar');
}