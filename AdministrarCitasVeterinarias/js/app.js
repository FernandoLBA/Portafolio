// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas {
     constructor() {
          this.citas = [];
     }

     agregarCita(cita) {
          this.citas = [...this.citas, cita];
     }

     eliminarCita(id) {
          this.citas = this.citas.filter(cita => cita.id != id);
     }

     // Este método recibe la cita ya actualiada o editada.
     editarCita(citaActualizada) {
          /*  
          -El map itera en cada una de las citas.
          -Verifica que la cita actualizada y la cita actual tengan el mismo id.
          -En caso que se cumpla se reescribe el objeto de la cita con la cita actualizada(que recibió el método).
          -Si no se cumple, mantiene el arreglo de cita actual.
          */
          this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
     }
}

class UI {
     // Método
     imprimirAlerta(mensaje, tipo) {
          // Crear el div
          const divMensaje = document.createElement('div');

          // Agrega clases
          divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

          // Agrega clases en base al error
          if (tipo === 'error') {
               divMensaje.classList.add('alert-danger');
          } else {
               divMensaje.classList.add('alert-success');
          }

          // Mensaje de error
          divMensaje.textContent = mensaje;

          // Agregar al DOM
          document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

          // Quitar alerta del DOM
          setTimeout(() => {
               divMensaje.remove();
          }, 5000);
     }

     // Se puede hacer destructuring directamente en el parámetro, como se puede ver se recibe un objeto que contiene un arreglo llamado citas, el cual se extrae
     imprimirCitas({ citas }) {
          // Borra los elementos previos del html
          this.limpiarHTML();

          // Itera dentro del arreglo
          citas.forEach(cita => {
               // Destructuring del arreglo cita
               const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

               const divCita = document.createElement('div');
               divCita.classList.add('cita', 'p-3');
               divCita.dataset.id = id;

               // Scripting de los elementos de la cita
               // Mascota
               const mascotaParrafo = document.createElement('h2');
               mascotaParrafo.classList.add('card.title', 'font-weight-bolder');
               mascotaParrafo.textContent = mascota;
               // Propietario
               const propietarioParrafo = document.createElement('p');
               propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}
               `;
               // Teléfono
               const telefonoParrafo = document.createElement('p');
               telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;
               // Fecha
               const fechaParrafo = document.createElement('p');
               fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;
               // Hora
               const horaParrafo = document.createElement('p');
               horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;
               // Síntomas
               const sintomasParrafo = document.createElement('p');
               sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

               // Botón para eliminar una cita
               const btnEliminar = document.createElement('button');
               btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
               // El ícono es de heroicons.dev
               btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
               // Al hacer click en eliminar, llama a la función
               btnEliminar.onclick = () => eliminarCita(id);

               // Añade un botón para editar
               const btnEditar = document.createElement('button');
               btnEditar.classList.add('btn', 'btn-info');
               btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
               // Al hacer click en editar, llama a la función
               btnEditar.onclick =
                    () => cargarEdicion(cita);

               // Agregar los párrafos al divCita
               divCita.appendChild(mascotaParrafo);
               divCita.appendChild(propietarioParrafo);
               divCita.appendChild(telefonoParrafo);
               divCita.appendChild(fechaParrafo);
               divCita.appendChild(horaParrafo);
               divCita.appendChild(sintomasParrafo);
               divCita.appendChild(btnEliminar);
               divCita.appendChild(btnEditar);

               // Agregar las citas al HTML
               contenedorCitas.appendChild(divCita);
          });
     }

     // Limpia el html previo en las citas
     limpiarHTML() {
          while (contenedorCitas.firstChild) {
               contenedorCitas.removeChild(contenedorCitas.firstChild);
          }
     }
}

const ui = new UI();
const administrarCitas = new Citas();

// Registrar Eventos
eventListeners();
function eventListeners() {
     mascotaInput.addEventListener('input', datosCita);
     propietarioInput.addEventListener('input', datosCita);
     telefonoInput.addEventListener('input', datosCita);
     fechaInput.addEventListener('input', datosCita);
     horaInput.addEventListener('input', datosCita);
     sintomasInput.addEventListener('input', datosCita);

     formulario.addEventListener('submit', nuevaCita);
}

// Para que la técnica de escribir los datos y que se vayan agregando a este objeto de manera simultánea, hay que asegurarse de tener en los input del html el atributo name definido con el mismo nombre de la propiedades del objeto
const citaObj = {
     mascota: '',
     propietario: '',
     telefono: '',
     fecha: '',
     hora: '',
     sintomas: ''
};

// Agrega datos al objeto de la cita
function datosCita(e) {
     // Así accede a las propiedades del objeto que correspondan con el atributo name del target y le asigna el valor
     citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una cita a la clase de Citas
function nuevaCita(e) {
     e.preventDefault();

     // Extraer la información del objeto de cita
     const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

     // Validar
     if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
          ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

          return;
     }

     // Valida si está creando o editando una cita
     if (editando) {
          // Mensaje de editado correctamente
          ui.imprimirAlerta('Se editó correctamente');

          // Pasar el objeto de la cita a edición
          administrarCitas.editarCita({...citaObj});

          // Colocar texto original del botón crear cita
          formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

          // Quitar modo edición
          editando = false;
     } else { // Crea una nueva
          // Genera un id con Date y lo inserta al objeto
          citaObj.id = Date.now();

          // Se envía una copia del objeto al método, para agregar una cita nueva y no se repitan los valores
          administrarCitas.agregarCita({ ...citaObj });

          // Mensaje de agregado correctamente
          ui.imprimirAlerta('Se agregó correctamente');
     }

     // Reinicia el objeto para la validación
     reiniciarObjeto();

     // Reinicia el formulario
     formulario.reset();

     // Muestra el HTML de las citas, enviando el objeto dela clase Citas
     ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
     citaObj.mascota = '';
     citaObj.propietario = '';
     citaObj.telefono = '';
     citaObj.fecha = '';
     citaObj.hora = '';
     citaObj.sintomas = '';
}

// Elimina una cita
function eliminarCita(id) {
     // Eliminar la cita
     administrarCitas.eliminarCita(id);

     // Muestra mensaje
     ui.imprimirAlerta('La cita ha sido eliminada exitosamente');

     // Refresaca las citas
     ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
function cargarEdicion(cita) {
     const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

     // Llenar los inputs
     mascotaInput.value = mascota;
     propietarioInput.value = propietario;
     telefonoInput.value = telefono;
     fechaInput.value = fecha;
     horaInput.value = hora;
     sintomasInput.value = sintomas;

     // Llenar el objeto
     citaObj.mascota = mascota;
     citaObj.propietario = propietario;
     citaObj.telefono = telefono;
     citaObj.fecha = fecha;
     citaObj.hora = hora;
     citaObj.sintomas = sintomas;
     citaObj.id = id;

     // Cambiar texto al botón de agregar
     formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

     editando = true;
}

