const criptomonedaSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
     moneda: '',
     criptomoneda: ''
}

// Crear un promise
// Recibe el resultado.Data del fetch
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
     // envía las criptomonedas al fetch
     resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', () => {
     consultarCriptomonedas();

     formulario.addEventListener('submit', submitFormulario);

     criptomonedaSelect.addEventListener('change', leerValor);

     monedaSelect.addEventListener('change', leerValor);
});

function consultarCriptomonedas() {
     const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

     fetch(url)
          .then(respuesta => respuesta.json())
          // Llama al promise y le envía el resultado
          .then(resultado => obtenerCriptomonedas(resultado.Data))
          // Recibe las criptomonedas del promise y retorna una función con las criptomonedas
          .then(criptomonedas => selectCriptomonedas(criptomonedas));
}

// Carga las criptomonedas al select
function selectCriptomonedas(criptomonedas) {
     criptomonedas.forEach(cripto => {
          const {
               FullName,
               Name
          } = cripto.CoinInfo;

          const option = document.createElement('option');
          option.value = Name;
          option.textContent = FullName;
          criptomonedaSelect.appendChild(option);
     });
}

// Llena el objeto objBusqueda
function leerValor(e) {
     objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
     e.preventDefault();

     // Validar 
     const {
          moneda,
          criptomoneda
     } = objBusqueda;

     if (moneda === '' || criptomoneda === '') {
          mostrarAlerta('Ambos campos son obligatorios', 'error');
          return;
     }

     // Consultar la api con los resultados
     consultarAPI();
}

function mostrarAlerta(mensaje, tipo) {
     limpiarHTML();

     const alerta = document.createElement('p');
     alerta.textContent = mensaje;
     alerta.classList.add(tipo);
     resultado.appendChild(alerta);

     setTimeout(() => {
          alerta.classList.remove('error');
          limpiarHTML();
     }, 3000);
}

function limpiarHTML() {
     if (resultado.firstChild) {
          resultado.removeChild(resultado.firstChild);
     }
}

function consultarAPI() {
     const {
          moneda,
          criptomoneda
     } = objBusqueda;

     // Usa el link "Multiple Symbols Full Data" de la api
     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

     mostrarSpinner();

     fetch(url)
          .then(respuesta => respuesta.json())
          .then(resultado => {
               // Usa el objeto display, este incluye 2 objetos internos (la criptomoneda y la moneda) y usando los valores extraídos del resultado, se pueden añadir dinámicamente
               mostrarCotizacionHTML(resultado.DISPLAY[criptomoneda][moneda]);
          });
}

function mostrarCotizacionHTML(cotizacion) {
     limpiarHTML();
     const {
          PRICE,
          HIGHDAY,
          LOWDAY, 
          CHANGEPCT24HOUR,
          LASTUPDATE
     } = cotizacion;
     const divCotizacion = document.createElement('div');
     divCotizacion.classList.add('precio');

     divCotizacion.innerHTML = `
          <p>
               El precio es: 
               <span>               
                    ${PRICE}
               </span>
          </p>
          <p>
               Precio más alto hoy:
               <span>
                    ${HIGHDAY}
               </span>
          </p>
          <p>
               Precio más bajo hoy:
               <span>
                    ${LOWDAY}
               </span>
          </p>
          <p>
               Variación en últimas 24 horas:
               <span>
                    ${CHANGEPCT24HOUR}%
               </span>
          </p>
          <p class="ultimo">
               Última actualización:
               <span>
                    ${LASTUPDATE}
               </span>
          </p>
     `;

     resultado.appendChild(divCotizacion);
}

function mostrarSpinner(){
     limpiarHTML();

     const spinner = document.createElement('div');
     spinner.classList.add('spinner');

     spinner.innerHTML = `
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
     `;

     resultado.appendChild(spinner);
}