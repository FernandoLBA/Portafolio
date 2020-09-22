// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Llama a la función
cargarEventListeners();

// Event Listeners
function cargarEventListeners() {
     // Agregar un curso al carrito, presionando el botón agregar al carrito
     listaCursos.addEventListener('click', agregarCurso);

     // Elimina cursos del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Muestra los cursos del local storage
     document.addEventListener('DOMContentLoaded', () => {
          // Agrega al arreglo articulosCarrito el contenido del carrito guardado en el local storage y si está vacío agrega un arreglo vacío
          articulosCarrito = JSON.parse (localStorage.getItem('carrito')) || [];

          // Llama a la función, para que muestre los cursos en el HTML 
          carritoHTML();
     })

     // Vaciar carrito
     vaciarCarritoBtn.addEventListener('click', () => {
          // Lo llena con un arreglo vacío
          articulosCarrito = [];

          // Llama a la función para limpiar el html
          limpiarHTML();
     })
}

// Funciones

// Selecciona el curso que se agregará al carrito
function agregarCurso(e) {
     // Previene la acción por defecto del botón
     e.preventDefault();

     // Para seleccionar la informacíon del nombre del curso, imagen y precio, se usa traversing hasta su padre
     const cursoSeleccionado = e.target.parentElement.parentElement;

     // Valida que el elemento contenga la clase 'agregar-carrito', para seleccionar al botón de agregar al carrito
     if (e.target.classList.contains('agregar-carrito')) {
          // Llama a la función y le pasa el curso seleccionado
          leerDatosCurso(cursoSeleccionado);
     }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
     // Si el elemento contiene la clase borrar-curso
     if(e.target.classList.contains('borrar-curso')) {
          // Obtiene el atributo único data-id del curso
          const cursoId = e.target.getAttribute('data-id');

          // Selecciona todos menos el curso seleccionado para borrar
          articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

          // llama a la función, para que muestre los cursos en el HTML
          carritoHTML();
     }
}

// Lee el contenido del curso y extrae su información
function leerDatosCurso(curso) {
     // Crea un objeto con la información del curso recibido, curso contiene el html
     const infoCurso = {
          // Carga la ruta de la imagen
          imagen: curso.querySelector('img').src,
          // Carga el título del curso
          titulo: curso.querySelector('h4').textContent,
          // Carga el precio de la clase precio
          precio: curso.querySelector('.precio span').textContent,
          // Carga el id del curso, contenido en el enlace del botón agregar al carrito
          id: curso.querySelector('a').getAttribute('data-id'),
          // La cantidad al principio siempre es igual a 1
          cantidad: 1
     }

     // Revisa si un elemento ya existe en el carrito, recorre los elementos y compara que curso.id e infoCurso.id sean iguales
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

     // Si el curso ya existe en carrito
     if (existe) {
          // Crea un nuevo arreglo y lo almacena en cursos, iterando cada curso
          const cursos = articulosCarrito.map(curso => {
               // Si curso.id e infoCurso.id son iguales
               if(curso.id === infoCurso.id) {
                    // Incrementa el valor cantidad en 1
                    curso.cantidad++;

                    // Retorna el curso ya sumando sus cantidades
                    return curso;
               } else {// Sino son iguales
                    // Retorna el curso tal cual estaba
                    return curso;
               }
          });

          // Agrega los cursos ya sumados o no al arreglo articulosCarrito
          articulosCarrito = [...cursos];
     } else { // Sino existe
          // Agrega el o los cursos(infoCurso) al arreglo articulosCarrito
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // Llama a la función
     carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
     // Limpia los cursos anterior del HTML
     limpiarHTML();

     // Itera los articulos que están en el carrito, curso por curso
     articulosCarrito.forEach(curso => {
          const { imagen, titulo, precio, cantidad, id } = curso;
          // Crea un table row
          const row = document.createElement('tr');

          // Añade la información al tr, contenida en su respectivo table data
          row.innerHTML = `
               <td>
                    <img src="${imagen}" width="100">
               </td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad}</td>
               <td class="boton-borrar">
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
               </td>
          `;

          // Agrega el HTML del carrito en el tbody
          contenedorCarrito.appendChild(row);
     });

     // Agrega el carrito de compras al storage
     sincronizarStorage();
}

// Agrega la información del carrito al local storage
function sincronizarStorage() {
     // Agrega el arreglo articulosCarrito al local storage
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Limpia los cursos anteriores del tbody del carrito
function limpiarHTML() {
     // Se ejecuta minetras que el contenedor del carrito contenga un hijo
     while (contenedorCarrito.firstChild) {
          // Si tiene algún hijo, lo borra del contenedor del carrito
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}