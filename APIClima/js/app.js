// Comsumo de api del clima, es necesario registrarse en la página:
// https://openweathermap.org/

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
     formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
     e.preventDefault();

     // validar
     const ciudad = document.querySelector('#ciudad').value;
     const pais = document.querySelector('#pais').value;

     if (ciudad === '' || pais === '') {
          // hubo un error
          mostrarError('Ambos campos son obligatorios');

          return;
     }

     // Consultar API
     consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
     const alerta = document.querySelector('.error');

     // impide que se duplique la alerta en el DOM
     if (!alerta) {
          // Crear una alerta
          const alerta = document.createElement('div');
          alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'error');

          alerta.innerHTML = `
          <strong class="font-bold">Error</strong>
          <span class="block">${mensaje}</span>
     `;

          container.appendChild(alerta);

          // remueve la alerta luego de 6 segundos
          setTimeout(() => {
               alerta.remove();
          }, 6000);
     }
}

function consultarAPI(ciudad, pais) {
     // Siempre se deben enviar los datos de forma estructurada, como la api los espera

     // Tomamos el key de tu cuenta, en api keys
     const appId = '018af3b200b71d01235c5d6c6cb554e5';

     // Usamos la api Current Weather Data, en API doc se encuentran las url
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

     spinner(); // muestra el spinner de carga

     fetch(url)
          .then(respuesta => respuesta.json())
          .then(datos => {
               // limpia el html
               limpiarHTML();

               // Valida si los datos son correctos
               if (datos.cod === '404') {
                    mostrarError('La ciudad no corresponde al país');

                    return;
               }

               // Imprime la respuesta en el html
               mostrarClima(datos);
          });
}

function mostrarClima(datos) {
     // hace un deep desctructuring, las temperaturas se encuentran dentro del objeto main del json, es decir un objeto dentro de otro objeto.
     const {
          name,
          main: {
               temp,
               temp_max,
               temp_min
          }
     } = datos;

     const temperatura = document.createElement('div');

     const tem = temp - 273.15;
     const temMax = temp_max - 273.15;
     const temMin = temp_min - 273.15;

     temperatura.classList.add('text-white', 'text-center');

     temperatura.innerHTML = `
          <p class="fontt-bold text-2xl">Clima en: ${name}</p>
          <p class="font-bold text-6xl">${parseInt(tem)} &#8451;</p>
          <p>Máxima: ${parseInt(temMax)} &#8451;</p>
          <p>Mínima: ${parseInt(temMin)} &#8451;</p>
     `;

     resultado.appendChild(temperatura);
}

function limpiarHTML() {
     while (resultado.firstChild) {
          resultado.removeChild(resultado.firstChild);
     }
}

function spinner() {
     limpiarHTML();
     
     const divSpinner = document.createElement('div');
     divSpinner.classList.add('spinner');

     divSpinner.innerHTML = `
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
     `;

     resultado.appendChild(divSpinner);
}