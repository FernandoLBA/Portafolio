// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventListeners();

function eventListeners() {
     document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

     formulario.addEventListener('submit', agregarGasto);
}


// Clases
class Presupuesto{
     constructor(presupuesto) {
          // Convierte a número el valor que recibe
          this.presupuesto = Number(presupuesto);

          // El restante sería el mismo presupuesto
          this.restante = Number(presupuesto);

          // Gastos es un array vacío
          this.gastos = [];
     }

     nuevoGasto(gasto){
          // Almacena una copia del arreglo y le asigna el nuevo arreglo
          this.gastos = [...this.gastos, gasto];
          this.calcularRestante();
     }

     calcularRestante() {
          // Reduce es un array method que itera sobre el arreglo, toma 2 parámetros (total, montoASumar) y los acumula en un gran total, e inicia en 0.
          const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);

          this.restante = this.presupuesto - gastado;

          console.log(this.restante);
     }

     eliminarGasto(id){
          // Almacena todos los elementos del arreglo, exceptuando el el id filtrado que corresponde con el recibido(el que se eliminará)
          this.gastos = this.gastos.filter(gasto => gasto.id !== id);

          // Llama al método y actualiza el restante
          this.calcularRestante();
     }
}

// Esta clase colocará los valores en el HTML
class UI{
     // Clase que recibe el objeto presupuesto
     insertarPresupuesto(cantidad){
          // Extrayendo los valores del objeto presupuesto
          const {presupuesto, restante} = cantidad;

          // Agrega al HTML
          document.querySelector('#total').textContent = presupuesto;
          document.querySelector('#restante').textContent = restante;
     }

     // Imprime los mensajes de alerta en el HTML
     imprimirAlerta(mensaje, tipo){
          // Crear el div
          const divMensaje = document.createElement('div');

          // Este proyecto usa Bootstrap, por lo tanto se usan sus clases
          divMensaje.classList.add('text-center', 'alert');

          if(tipo === 'error'){
               divMensaje.classList.add('alert-danger');
          } else {
               divMensaje.classList.add('alert-success');
          }

          // Mensaje de error
          divMensaje.textContent = mensaje;

          // Insertar en HTML
          document.querySelector('.primario').insertBefore(divMensaje, formulario);

          // Quitar mensaje del HTML
          setTimeout(() => {
               divMensaje.remove();
          }, 3000);
     }

     mostrarGastos(gastos) {
          // Elimina el HTML previo
          this.limpiarHTML();

          // Itera los gastos
          gastos.forEach(gasto =>  {
               // Destructuring para extraer los atributos del objeto
               const {cantidad, nombre, id} = gasto;

               // Crear un li -----------------
               const nuevoGasto = document.createElement('li');

               // Agrega las clases
               nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';

               // Agrega el atributo data-id y le asigna el valor de id
               
               // Antigua forma de agregar el id
               //nuevoGasto.setAttribute('data-id', id);

               // Nueva forma de agregar el id
               nuevoGasto.dataset.id = id;
               // -----------------------------

               console.log(nuevoGasto);

               // Agregar el html del gasto
               nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;

               // Botón para borrar gasto
               const btnBorrar = document.createElement('button');

               // Agrega texto y un símbolo al botón borrar
               btnBorrar.innerHTML = 'Borrar &times';

               btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');

               btnBorrar.onclick = () => {
                    eliminarGasto(id);
               }

               nuevoGasto.appendChild(btnBorrar);

               // Agregar al html
               gastoListado.appendChild(nuevoGasto);
          });
     }

     // Limpia el HTML
     limpiarHTML(){
          // Si existe un gasto en el html, lo remueve
          while(gastoListado.firstChild) {
               gastoListado.removeChild(gastoListado.firstChild);
          }
     };

     // Coloca el restante
     actualizarRestante(restante) {
          document.querySelector('#restante').textContent = restante;
     }

     comprobarPresupuesto(presupuestoObj){
          const { presupuesto, restante} = presupuestoObj;

          const restanteDiv = document.querySelector('.restante');

          // Comprobar si gastos supera el 75% del presupuesto y si es igual o mayor al 50% y al hacer la devolución retorne a su color original
          if((presupuesto / 4) > restante){
               restanteDiv.classList.remove('alert-success', 'alert-warning');
               restanteDiv.classList.add('alert-danger');
          } else if ((presupuesto / 2) >= restante) {
               restanteDiv.classList.remove('alert-success');
               restanteDiv.classList.add('alert-warning');
          } else {
               restanteDiv.classList.remove('alert-danger', 'alert-warning');
               restanteDiv.classList.add('alert-success');
          }

          // Si el presupuesto restante es cero o menor
          if(restante <= 0) {
               ui.imprimirAlerta('Su presupuesto se ha agotado', 'error');

               // Desactiva el botón para agregar gasto
               formulario.querySelector('button[type="submit"]').disabled = true;
          }
     }
}

// Instancia UI
const ui = new UI();

//const presupuesto = new Presupuesto();


// Funciones

// Consulta el presupuesto
let presupuesto;
function preguntarPresupuesto() {
     // Muestra un mensaje
     const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');

     // Convierte el valor de entrada a número
     // console.log(Number(presupuestoUsuario));

     /* 
          Valida:
          1- Si presiona aceptar con la entrada vacía.
          2- Si presionafer cancelar con la entrada vacía
          3- Si el valor de entrada no es un número
          4- Si el valor de entrada es cero o negativo
     */
     if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
          // recarga la página
          window.location.reload();
     }

     // Presupuesto válido
     // Instancia Presupuesto
     presupuesto = new Presupuesto(presupuestoUsuario);

     console.log(presupuesto);

     // Envía a la función de la clase el objeto presupuesto
     ui.insertarPresupuesto(presupuesto);
}

// Añade un gasto
function agregarGasto(e) {
     e.preventDefault();

     // Leer datos del formulario
     const nombre = document.querySelector('#gasto').value;
     const cantidad = Number(document.querySelector('#cantidad').value);

     // Validar campos vacíos
     if(nombre === '' || cantidad === ''){
          // Manda el mensaje y la clase de error a la función
          ui.imprimirAlerta('Ambos campos son obligatorios.', 'error');

          // Impide que se ejecute el códifo fuera de este if
          return;
     } else if( cantidad <= 0 || isNaN(cantidad)){// Si es cero, negativo o no es un número
          ui.imprimirAlerta('Cantidad inválida', 'error');
          document.querySelector('#cantidad').value = '';
          document.querySelector('#cantidad').focus();

          // Impide que se ejecute el códifo fuera de este if
          return;
     }

     // Generar objeto con el gasto
     // Usa nombre, cantidad y un ID que recibe el valor del Date.now
     const gasto = {nombre, cantidad, id: Date.now()};

     // Añade un nuevo gasto
     presupuesto.nuevoGasto(gasto);

     // Envía el mensaje al método, en este caso no es necesario enviar el tipo
     ui.imprimirAlerta('Gasto agregado con éxito');

     // Imprimir los gastos--------------------
     // Destructuring para extraer gastos del objeto presupuesto
     const {gastos, restante} = presupuesto;

     // Se envían los gastos al método 
     ui.mostrarGastos(gastos);
     //----------------------------------------
     
     // Se envía el restante al método
     ui.actualizarRestante(restante);

     // Se envía el objeto presupuesto al método
     ui.comprobarPresupuesto(presupuesto);

     // Reinicia el formulario
     formulario.reset();
}

// Elimina el gasto
function eliminarGasto(id) {
     // envía el id al método y elimina el gasto del objeto
     presupuesto.eliminarGasto(id);
     
     // Distructuring para extraer gastos y restante del objeto presupuesto
     const {gastos, restante} = presupuesto;

     // Envía los gastos al método y lo elimina del HTML
     ui.mostrarGastos(gastos);

     // Se envía el restante al método
     ui.actualizarRestante(restante);

     // Se envía el objeto presupuesto al método
     ui.comprobarPresupuesto(presupuesto);
}