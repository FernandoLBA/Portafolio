// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Obtiene el año actual
const max = new Date().getFullYear();

// Le resta 10 años al año actual
const min = max - 10;

// Generar un objeto con la búsqueda, todas las opciones que aparecen en los select
const datosBusqueda = {
     marca: '',
     year: '',
     minimo: '',
     maximo: '',
     puertas: '',
     transmision: '',
     color: '',
}

// Eventos
// Este event Listerner se activa con el evento DOMContentLoaded, es decir al cargar la página y llama a un arrow function
document.addEventListener('DOMContentLoaded', () => {
     // Función que cargará todos los autos
     mostrarAutos(autos);

     // Llena las opciones de año
     llenarSelect();
});

// Event Listener para los select de búsqueda
// Agrega la marca al objeto datosBusqueda
marca.addEventListener('change', e => {
     // Toma el valor del campo seleccionado
     datosBusqueda.marca = e.target.value;

     // Llama a la función
     filtrarAuto();
});

// Agrega el año al objeto datosBusqueda
year.addEventListener('change', e => {
     // Toma el valor del campo seleccionado y lo convierte a entero
     datosBusqueda.year = parseInt(e.target.value);

     // Llama a la función
     filtrarAuto();
});

// Agrega el precio mínimo al objeto datosBusqueda
minimo.addEventListener('change', e => {
     datosBusqueda.minimo = e.target.value;

     // Llama a la función
     filtrarAuto();
});

// Agrega el precio máximo al objeto datosBusqueda
maximo.addEventListener('change', e => {
     datosBusqueda.maximo = e.target.value;

     // Llama a la función
     filtrarAuto();
});

// Agrega las puertas al objeto datosBusqueda
puertas.addEventListener('change', e => {
     datosBusqueda.puertas = parseInt(e.target.value);

     // Llama a la función
     filtrarAuto();
});

// Agrega la transmisión al objeto datosBusqueda
transmision.addEventListener('change', e => {
     datosBusqueda.transmision = e.target.value;

     // Llama a la función
     filtrarAuto();
});

// Agrega el color al objeto datosBusqueda
color.addEventListener('change', e => {
     datosBusqueda.color = e.target.value;

     // Llama a la función
     filtrarAuto();
});

// Funciones
// Muestra los autos
function mostrarAutos(autos) {
     // Elimina los resultados previos del html
     limpiarHTML();

     // Itera en el arreglo autos contenido en el archivo db.js
     autos.forEach(auto => {
          // Crea un párrafo por marca
          const autoHTML = document.createElement('p');

          // Al declarar de esta manera, no es necesario que coloquemos: ${auto.marca} ${auto.marca}, solo escribimos ${marca} ${modelo}
          const { marca, modelo, year, puertas, transmision, precio, color } = auto;


          // Añade la marca para cada auto
          autoHTML.textContent = `
               ${marca} ${modelo} -${year} - ${puertas} puertas - Transmisión: ${transmision} -  Color: ${color} - Precio: ${precio} 
          `;

          // Inserta el HTML al DOM
          resultado.appendChild(autoHTML);
     })
}

// Limpia HTML
function limpiarHTML() {
     // Mientras resultado tenga un hijo primero
     while (resultado.firstChild) {
          // Remueve el elemento child 
          resultado.removeChild(resultado.firstChild);
     }
}

// Genera e inserta los años al select
function llenarSelect() {
     for (let i = max; i >= min; i--) {
          // Crea el elemento option
          const opcion = document.createElement('option');

          // Agrega el valor a la opcion
          opcion.value = i;

          // Agrega texto a la opcion
          opcion.textContent = i;

          // Inserta la opción en el select
          year.appendChild(opcion);
     }
}

// Función que filtra en base a la búsqueda
function filtrarAuto() {
     // Esto es una función de alto nivel, es decir una función que toma a otra función, también soporta el chaining y podemos filtrar varias veces
     const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

     if (resultado.length) {
          // Muestra los resultados en el HTML
          mostrarAutos(resultado);
     } else {
          noResultado();
     }
}

// Muestra mensaje cuando no hay resultados
function noResultado() {
     // Limpia los resultados previos
     limpiarHTML();

     // Crea el elemento div
     const mensaje = document.createElement('div');

     // Añade clases y estilos al div
     mensaje.classList.add('alerta', 'error', 'uppercase');

     // Añade el texto al div
     mensaje.textContent = 'No hay resultados';

     // Añade el párrafo al html
     resultado.appendChild(mensaje);
}

// Filtra por marca
function filtrarMarca(auto) {
     const { marca } = datosBusqueda;

     // Si marca está llena
     if (marca) {
          // Retorna la marca del auto, siempre que sea igual al del select
          return auto.marca === marca;
     }

     // Si no esté llena la marca, retorna el auto completo sin filtrar
     return auto;
}

// Filtra por año
function filtrarYear(auto) {
     const { year } = datosBusqueda;

     // Si year está lleno
     if (year) {
          // Retorna el año del auto, siempre que sea igual al del select
          return auto.year === year;
     }

     // Si año no está lleno, retorna el auto completo sin filtrar
     return auto;
}

// Filtra por precio mínimo
function filtrarMinimo(auto) {
     const { minimo } = datosBusqueda;

     // Si mínimo está lleno
     if (minimo) {
          // Retorna los que sean mayores o igual que el precio mínimo
          return auto.precio >= minimo;
     }

     // Si minimo no está lleno, retorna el auto completo sin filtrar
     return auto;
}

// Filtra por precio máximo
function filtrarMaximo(auto) {
     const { maximo } = datosBusqueda;

     // Si mínimo está lleno
     if (maximo) {
          // Retorna los que sean menores o igual que el precio máximo
          return auto.precio <= maximo;
     }

     // Si máximo no está lleno, retorna el auto completo sin filtrar
     return auto;
}

// Filtra por puertas
function filtrarPuertas(auto) {
     const { puertas } = datosBusqueda;
     if (puertas) {
          return auto.puertas === puertas;
     }

     return auto;
}

// Filtra por transmisión
function filtrarTransmision(auto) {
     const { transmision } = datosBusqueda;
     if (transmision) {
          return auto.transmision === transmision;
     }

     return auto;
}

// Filtra por color
function filtrarColor(auto) {
     const { color } = datosBusqueda;
     if (color) {
          return auto.color === color;
     }

     return auto;
}