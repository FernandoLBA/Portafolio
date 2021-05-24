/* los componentes deben comenzar por mayúscula, ejemplo: Header.js. y crearlos dentro de la carpeta src
 */

import React from 'react';

// mediante los props, este componente recibe los datos enviados desde el componente principal App.js
/* function Header({
     titulo,
     descripcion
}) {
     // dentrod e estas llaver se puede escribir código JS
     //console.log(props);
     // si el componente principal App.js no tuviese un elemento contenedor como el div, este código no funcionaría, ya que siempre debe estar dentro de un elemento contenedor.
     return (
          // también dentro del jsx se pueden invocar variables, llamar a props o escribir código de javascrips solo colocándolo entre llaves
          //<h1>Hola Mundo {props.titulo}</h1>
          <Fragment>
               <h1 > Hola Mundo, {titulo}</h1> 
               <h2 > {descripcion} </h2> 
          </Fragment>
     );
} */

// 2da forma de escribir un componente
const Header = ({titulo}) => {

     return (
          <h1> {titulo}</h1>
     );
};

export default Header;