// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Esta es una expresión regular para validar un email, se obtuvo de la página emailregex.com
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

limpiaFormulario();

// Event Listeners
// Llama a la función con los event listeners
eventListeners();

// Función eventlisteners
function eventListeners() {
     // Cuando la app arranca
     document.addEventListener('DOMContentLoaded', iniciarApp);

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Botón reset
     btnReset.addEventListener('click', limpiaFormulario);

     // Botón enviar email
     formulario.addEventListener('submit', enviarEmail);
}

// Funciones
// Acciones al iniciar la app
function iniciarApp() {
     // Deshabilita el botón de enviar
     btnEnviar.disabled = true;

     // Agregamos las clases de no permitir el cursor y establecer la opacidad al 50
     btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
     var tipo = e.target.type;

     // Valida email
     if (tipo === 'email') {
          // Está vacío
          if (e.target.value.length == 0) {
               // Remueve el borde verde, si lo tenía
               e.target.classList.remove('border', 'border-green-500');

               // Agrega el borde rojo
               e.target.classList.add('border', 'border-red-500');

               // Envía el id para mostrar el error
               mensajesError(email.id);
          } else { // Está lleno
               // Agrega el borde verde, si lo tenía
               e.target.classList.add('border', 'border-green-500');

               // Remueve el borde rojo
               e.target.classList.remove('border', 'border-red-500');

               // Valida email
               validarEmail(e);
          }
     }

     if (tipo === 'text') { // Asunto
          // Si está vacío
          if (e.target.value.length == 0) {
               // Remueve el borde verde, si lo tenía
               e.target.classList.remove('border', 'border-green-500');

               // Agrega el borde rojo
               e.target.classList.add('border', 'border-red-500');

               // Envía el id para mostrar el error
               mensajesError(asunto.id);
          } else { // Si está lleno
               // Remueve el borde rojo
               e.target.classList.remove('border', 'border-red-500');

               // Agrega el borde verde, si lo tenía
               e.target.classList.add('border', 'border-green-500');

               // Selecciona el error
               const error = document.querySelector('p.error');

               // Si hay un error lo remueve
               if (error) {
                    error.remove();
               }
          }
     }

     if (tipo === 'textarea') { // Mensaje
          // Si está vacío
          if (e.target.value.length == 0) { // Vacío
               // remueve el borde verde
               e.target.classList.remove('border', 'border-green-500');

               // Remueve el borde rojo
               e.target.classList.add('border', 'border-red-500');

               // Envía el id del elemento a la función
               mensajesError(mensaje.id);
          } else { // Si está lleno
               // Remueve el borde rojo
               e.target.classList.remove('border', 'border-red-500');

               // Remueve el borde verde
               e.target.classList.add('border', 'border-green-500');

               // Selecciona el error
               const error = document.querySelector('p.error');

               // Si hay un error lo remueve
               if (error) {
                    error.remove();
               }
          }
     }

     // Activa el botón de enviar
     if (er.test(email.value) && asunto.value != '' && mensaje.value != '') {
          // Activa botón de enviar
          btnEnviar.disabled = false;

          // Remueve las clases que bloquean al botón
          btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
     } else {
          // Desactiva botón de enviar
          btnEnviar.disabled = true;

          // Agrega las clases que bloquean al botón
          btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
     }
}

function mostrarError(mensaje) {
     // Crea un elemento párrafo
     const mensajeError = document.createElement('p');

     // Añade el texto al párrafo
     mensajeError.textContent = mensaje;

     // Agrega clases, pertenecientes al framework tailwind
     mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

     // Esto hace que se muestre una sola vez el párrafo de error
     // Busca si hay clases .error en el DOM
     const errores = document.querySelectorAll('.error');

     // Si no hay errores previos entonces añade el párrafo con el error
     if (errores.length === 0) {
          // Añade el párrafo con el mensaje de error al formulario
          formulario.appendChild(mensajeError);
     }
}

// Valida el campo email
function validarEmail(e) {
     var mensaje;

     // Valida la expresión regular con el método test, ejm: expresionregular.test(cadena a evaluar)
     if (er.test(e.target.value)) {

          // Selecciona el elemento error
          const error = document.querySelector('p.error');

          // Si hay un error lo remueve
          if (error) {
               error.remove();
          }

          // Remueve el borde rojo
          e.target.classList.remove('border', 'border-red-500');

          // Remueve el borde verde
          e.target.classList.add('border', 'border-green-500');
     } else {// hay un error
          // Envía el id del elemento a la función
          mensajesError(email.id);

          // Remueve la clase con el borde verde
          e.target.classList.remove('border', 'border-green-500');

          //agrega la clase del framework tailwind en el cual se construyó el proyecto para colocar el campo en color rojo
          e.target.classList.add('border', 'border-red-500', 'error');
     }
}

// Envía los ensajes de error
function mensajesError(id) {
     var mensaje;

     // Si el id es email
     if (id == 'email') {
          mensaje = 'Email vacío o inválido.';
     }

     // Si el id es asunto
     if (id == 'asunto') {
          mensaje = 'Asunto vacío.';
     }

     // Si el id es mensaje
     if (id == 'mensaje') {
          mensaje = 'Mensaje vacío.';
     }

     // Le manda el mensaje con el error a la función
     mostrarError(mensaje);
}

// Enviar email
function enviarEmail(e) {
     // Previene que se ejecute la acción por defecto
     e.preventDefault();

     // Mostrar spinner
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Después de 3 segundos ocultar el Spinner y mostrar el mensaje
     setTimeout(() => {
          // Oculta el spinner
          spinner.style.display = 'none';

          // Crea un mensaje en el DOM
          const parrafo = document.createElement('p');

          // Coloca el texto del párrafo
          parrafo.textContent = 'Mensaje Enviado';

          // Agrega estilo al párrafo
          parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

          // Inserta el parrafo antes del spinner, ejm: elementoDondeSeInserta.insertBefore(elementoAInsertar, elementoSeleccionado);
          formulario.insertBefore(parrafo, spinner);

          // Desaparece mensaje y resetea el formulario
          setTimeout(() => {
               // Elimina el párrafo de enviado
               parrafo.remove();

               // Resetea el formulario
               limpiaFormulario();
          }, 5000);
     }, 3000); // Colocamos los milisegundos

     // Con el interval, se ejecuta la función cada 3000 milisegundos
     /* setInterval( () => {
          console.log('bla bla bla');
     }, 3000); // Colocamos los milisegundos */
}

// Limpia los campos al cargar la página
function limpiaFormulario() {
     formulario.reset();

     iniciarApp();
}