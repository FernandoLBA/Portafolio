import {obtenerCliente, editarCliente} from './API.js';
import {mostrarAlerta, validar} from './funciones.js';

(function(){
     // Campos del formulario
     const nombreInput = document.querySelector('#nombre');
     const emailInput = document.querySelector('#email');
     const empresaInput = document.querySelector('#empresa');
     const telefonoInput = document.querySelector('#telefono');
     const idInput = document.querySelector('#id');

     document.addEventListener('DOMContentLoaded', async () => {
          const parametrosURL = new URLSearchParams(window.location.search);

          const idCliente = parseInt(parametrosURL.get('id'));

          const cliente = await obtenerCliente(idCliente);

          mostrarCliente(cliente);

          // Submit al formulario
          const formulario = document.querySelector('#formulario');
          formulario.addEventListener('submit', validarCliente);
     });

     // Muestra los datos del cliente a editar en el formulario
     function mostrarCliente(cliente){
          const {nombre, empresa, email, telefono, id} = cliente;

          nombreInput.value = nombre;
          emailInput.value = email;
          empresaInput.value = empresa;
          telefonoInput.value = telefono;
          idInput.value = id;
     }

     function validarCliente(e){
          e.preventDefault();

          const cliente = {
               nombre: nombreInput.value,
               email: emailInput.value,
               empresa: empresaInput.value,
               telefono: telefonoInput.value,
               id: parseInt(idInput.value)
          }

          // Valida si la función validar se cumple y le envía el objeto
          if (validar(cliente)) {
               // Mostrar mensaje
               mostrarAlerta('Todos los campos son obligatorios');

               return;
          }

          // Reescribe el objeto
          editarCliente(cliente);
     }
})();