const url = 'http://localhost:4000/clientes';

// Crea un nuevo cliente, recibe un cliente
export const nuevoCliente = async cliente => {
     /*  Siempre que se crea un nuevo registro se usa el método de POST
      idependientemente del lenguaje de backend. */
     try {
          // Por defecto fetch usa el método  GET para obtener datos de un servidor, en este caso se agregará un nuevo cliente, por eso se usará el método POST dentro de un objeto.
          await fetch(url, {
               method: 'POST',
               /* body envía el contenido de la petición POST,
               se envía de dos formas: string 
               u objeto*/
               body: JSON.stringify(cliente),
               /* el header, envía el tipo de datos que se están enviando */
               headers: {
                    'Content-Type': 'application/json'
               }
          });

          // Cuando se complete el fetch, redirecciona al cliente hacia el index
          window.location.href='index.html';

     } catch (error) {
          console.log(error);
     }
}

// Obtiene todos los clientes
export const obtenerClientes = async () => {
     try {
          const resultado = await fetch(url);
          const clientes = await resultado.json();
          return clientes;
     } catch (error) {
          console.log(error);
     }
}

// Elimina un cliente, recibe un cliente
export const eliminarCliente = async id => {
     try {
          // Agrega al url el id a eliminar
          await fetch(`${url}/${id}`, {
               /* Para eliminar se usa el método DELETE */
               method: 'DELETE',  
          })
     } catch (error) {
          console.log(error);
     }
}

// Obtiene un cliente por su ID
export const obtenerCliente = async id => {
     try {
          const resultado = await fetch(`${url}/${id}`);
          const cliente = await resultado.json();
          return cliente;
     } catch (error) {
          console.log(error);
     }
}

// Actualiza un registro
export const editarCliente = cliente => {
     try {
          fetch(`${url}/${cliente.id}`,{
               method: 'PUT',
               body: JSON.stringify(cliente),
               headers: {
                    'Content-Type': 'application/json'
               }
          });
          window.location.href = 'index.html';
     } catch (error) {
          console.log(error);
     }
}