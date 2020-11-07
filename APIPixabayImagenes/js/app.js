const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');
// La Paginación se calcula así:
// Cantidad de registros de la api: CRAPI
// Cantidad de registros por página: CRPP
// Total Paginas: TP
// Fórmula: TP = CRAPI/CRPP
// Asigna la cantidad de registros que se mostraran en una página
const registrosPorPagina = 30;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
     formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
     e.preventDefault();

     const terminoBusqueda = document.querySelector('#termino').value;

     if (terminoBusqueda === '') {
          mostrarAlerta('El campo no debe estar vacío');

          return;
     }

     buscarImagenes();
}

function mostrarAlerta(mensaje) {
     // Para que no se repita la alerta, la selecciona
     const existeAlerta = document.querySelector('.bg-red-100');

     // Luego valida si existe o no la alerta
     if (!existeAlerta) {
          const alerta = document.createElement('p');
          alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

          alerta.innerHTML = `
          <strong class="font-bold">Error</strong>
          <span class="block sm:inline">${mensaje}</span>
     `;

          formulario.appendChild(alerta);

          setTimeout(() => {
               alerta.remove();
          }, 3000);
     }
}

function buscarImagenes() {
     const termino = document.querySelector('#termino').value;

     // key de la api
     const key = '18817063-b6709bb75f30718a9c93229e5';
     // La api tiene variables para usar y para paginación también
     const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

     fetch(url)
          .then(respuesta => respuesta.json())
          .then(resultado => {
               // Para paginar, le envia el total de registros de la api (totalHits)
               totalPaginas = calcularPaginas(resultado.totalHits);
               mostrarImagenes(resultado.hits);
          });
}

// Calcula la cantidad de registros que mostrará por página
function calcularPaginas(total){
     // Math.ceil redondea hacia arriba un número, ejemplo 12.1, redondeará a 13.
     return parseInt(Math.ceil(total/registrosPorPagina));
}

// Generador que registrará la cantidad de elementos de acuerdo a las páginas
function *crearPaginador(total){
     // Itera en base a la cantidad de páginas
     for(let i = 1; i <= total; i++) {
          yield i;
     }
}

function mostrarImagenes(imagenes){
     // Limpia el html
     while(resultado.firstChild){
          resultado.removeChild(resultado.firstChild);
     }

     // Itera sobre el arreglo de imagenes y construye el html
     imagenes.forEach(imagen => {
          const {previewURL, largeImageURL, likes, views} = imagen;

          resultado.innerHTML += `
               <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                    <div class="bg-white">
                         <img class="w-full" src="${previewURL}">

                         <div class="p-4">
                              <p class="font-bold">
                                   ${likes} 
                                   <span class="font-light">
                                        Me gusta
                                   </span>
                              </p>
                              <p class="font-bold mb-2">
                                   ${views} 
                                   <span class="font-light">
                                        Vistas
                                   </span>
                              </p>
                              <a class="bg-blue-600 hover:bg-blue-800 px-2 py-1 rounded text-white block text-center capitalize" href="${largeImageURL}"  target="_blank" rel="noopener noreferrer">
                                   Ver imagen
                              </a>
                         </div>
                    </div>
               </div>     
          `;
     });

     // Limpiar el paginador previo
     while(paginacionDiv.firstChild){
          paginacionDiv.removeChild(paginacionDiv.firstChild);
     }

     // Genera el html
     imprimirPaginador();
}

function imprimirPaginador(){
     iterador = crearPaginador(totalPaginas);

     // El while es true, para mantenerse siempre activo y revisar todo el generador
     while(true){
          // El generador usa el next para ir al próximo registro luego se apaga, 
          const {value, done} = iterador.next();
          
          // EL generador usa done para saber si llegó al final, este retorna true si está al final o false si aún no llega al final
          if(done) return;

          // Caso contrario, se genera un botón por cada elemento en el generador
          const boton = document.createElement('a');
          // url del enlace
          boton.href = '#';
          // asigna al atributo data del html el value del generador
          boton.dataset.pagina = value;
          boton.textContent = value;
          boton.classList.add('siguiente', 'bg-yellow-400', 'px-1', 'py-0', 'mb-2', 'mr-2', 'rounded');

          // Al presionar el boton captura su valor
          boton.onclick = () => {
               paginaActual = value;

               buscarImagenes();
          }

          paginacionDiv.appendChild(boton);
     }
}