// Constructores
function Seguro(marca, year, tipo) {
     this.marca = marca;
     this.year = year;
     this.tipo = tipo;
}

// Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function() {
     /* 
          1 = Americano 1.15
          2 = Asiático 1.05
          3 = Europeo 1.35
     */

     let cantidad;
     const base = 2000;

     switch (this.marca) {
          case '1':
               cantidad = base * 1.15;          
               break;
          case '2':
               cantidad = base * 1.05;
               break;
          case '3':
               cantidad = base * 1.35;
               break;
          default:
               break;
     }

     // Leer el año
     const diferencia = new Date().getFullYear() - this.year;

     // Se descontará 3% por cada año en vehículos que no sean del año actual
     cantidad -= ((diferencia * 3) * cantidad / 100);

     /* 
          -Si el seguro es básico: se multiplica por 30% ms
          -Si el seguro es completo: se multiplica por 50% más
     */
    if(this.tipo === 'basico') {
         cantidad *= 1.30;
    } else {
         cantidad *= 1.50;
    }

     return cantidad;
}

function UI() {}

// Llena las opciones de años
// En este caso se usa un arrow function ya que el object constructor no está definido y el proto no hace referencia a un this.
UI.prototype.llenarOpciones = () => {
     const max = new Date().getFullYear(),
           min = max - 20;

     const selectYear = document.querySelector('#year');

     for(let i = max; i >= min; i--) {
          let option = document.createElement('option');

          option.value = i;
          option.textContent = i;
          selectYear.appendChild(option);
     }
}

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
     const div = document.createElement('div');

     if(tipo === 'error') {
          div.classList.add('error');
     } else {
          div.classList.add('correcto');
     }

     div.classList.add('mensaje', 'mt-10');
     div.textContent = mensaje;

     // Insertar en el html
     const formulario = document.querySelector('#cotizar-seguro');
     // El insertBefore recibe el nuevo nodo y el node de referencia donde se va a insertar
     formulario.insertBefore(div, document.querySelector('#resultado'));

     setTimeout(() => {
          div.remove();
     }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
     const {marca, year, tipo} = seguro;

     let textoMarca;
     switch (marca) {
          case '1':
               textoMarca = 'Americano';
               break;
          case '2':
               textoMarca = 'Asiático';
               break;
          case '3':
               textoMarca = 'Europeo';
               break;
          default:
               break;
     }
     // Crear el resultado
     const div = document.createElement('div');
     div.classList.add('mt-10');

     div.innerHTML= `
          <p class="header">Tu Resumen</p>
          <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</p>
          <p class="font-bold">Año: <span class="font-normal">${year}</p>
          <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</p>
          <p class="font-bold">Total: <span class="font-normal">$ ${total}</p>
     `;

     const resultadoDiv = document.querySelector('#resultado');

     // Mostrar el spinner
     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';

     setTimeout(() => {
          // Borra el spinner
          spinner.style.display = 'none';

          // Muestra el div con el resultado
          resultadoDiv.appendChild(div);
     }, 3000);
}

// Instanciar UI
const ui = new UI();

console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
     // Llena el select con los años
     ui.llenarOpciones(); 
})

eventListeners();

function eventListeners() {
     const formulario = document.querySelector('#cotizar-seguro');
     formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
     e.preventDefault();

     // Leer la marca seleccionada
     const marca = document.querySelector('#marca').value;

     // Leer el año seleccionado
     const year = document.querySelector('#year').value;

     // Leer el tipo de cobertura
     // Así selecciona el radio button seleccionado(por su name, mediante un selector css) y captura su valor
     const tipo = document.querySelector('input[name="tipo"]:checked').value;

     if(marca === '' || year === '' || tipo === '') {
          // Envía el mensaje y el tipo
          ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
          
          // Termina la función
          return;
     }

     ui.mostrarMensaje('Cotizando...', 'exito');

     // Ocultar las cotizaciones previas
     const resultados = document.querySelector('#resultado div');
     if(resultados != null) {
          resultados.remove();
     }

     //Instanciar el seguro
     const seguro = new Seguro(marca, year, tipo);
     const total = seguro.cotizarSeguro();

     // Utilizar el prototype que va a cotizar
     ui.mostrarResultado(total, seguro);
}