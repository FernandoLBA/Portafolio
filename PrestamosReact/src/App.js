/* 
Se borran los archivos de app.css, el logo.svg y el app.test.js, ya que no los usaremos, también borramos los imports de app.css y el de logo.svg.
*/

/* importamos el componente a usar */
import React, {Fragment, useState} from 'react';
import Formulario from './componentes/Formulario';
import Header from './componentes/Header';
import Mensaje from './componentes/Mensaje';
import Resultado from './componentes/Resultado';
import Spinner from './componentes/Spinner';

function App() {
  // Definir el state
  // el array desctructuring saca 2 valores, el valor que contiene el state y la función que modifica el valor del state
  //     valorState   Función
  const [cantidad, guardarCantidad]= useState(0);
  const [plazo, guardarPlazo]= useState('');
  const [total, guardarTotal] = useState(0);
  const [cargando, guardarCargando] = useState(false);

  // Carga condicional de componentes
  let componente;
  if(cargando){
    componente = <Spinner />
    // Si total = 0 quiere decir que no han realizado cotizaciones
  } else if(total === 0){
    componente = <Mensaje />
  } else {
    componente = <Resultado 
                  total = {total}
                  plazo = {plazo}
                  cantidad = {cantidad}
                />
  }

  return (
     <Fragment>
       <Header 
          titulo="Cotizador de Préstamos"
       />  

       <div className="container">
         {/* se pasan los valores por los props */}
         <Formulario 
          cantidad = {cantidad}
          guardarCantidad = {guardarCantidad}
          plazo = {plazo}
          guardarPlazo = {guardarPlazo}
          guardarTotal = {guardarTotal}
          guardarCargando = {guardarCargando}
         />

          {/* aquí se usa carga condicional de componentes */}
         <div className="mensajes">
          {componente}
         </div>
       </div>
     </Fragment>
  );
}

export default App;
