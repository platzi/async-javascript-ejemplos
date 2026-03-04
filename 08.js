function obtenerUsuario(id) {
  return fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    });
} 

// obtenerUsuario(1)
//   .then(usuario => {
//     console.log("usuario", usuario.name);
//     return usuario;
//   })
//   .then(usuario => {
//     console.log("Id recibido:", usuario.id);
//     return usuario;
//   })
//   .then(usuario => {
//     console.log("Role:", usuario.role);
//     return usuario;
//   })
//   .then(usuario => {
//     console.log("Email:", usuario.email);
//     return usuario;
//   })
//   .catch(error => {
//     console.error("Error al obtener usuario:", error.message);
//   });

 

// // ANTES: Callback Hell
// operacion1(function(res1) {
//   operacion2(res1, function(res2) {
//     operacion3(res2, function(res3) {
//       console.log(res3);
//     });
//   });
// });


// // AHORA: Promise Chaining
// operacion1()
//   .then(res1 => operacion2(res1))
//   .then(res2 => operacion3(res2))
//   .then(res3 => console.log(res3));

// Retornando promesas dentro de .then()

function obtenerPedidos(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 101, producto: "Laptop" }, { id: 102, producto: "Mouse" }]);
    }, 400);
  });
}

function obtenerDetalle(pedidoId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: pedidoId, estado: "enviado", total: 1200 });
    }, 300);
  });
}

// Encadenamiento con Promesas anidadas
obtenerUsuario(1)
  .then(usuario => obtenerPedidos(usuario.id))   // Retorna una Promesa
  .then(pedidos  => obtenerDetalle(pedidos[0].id)) // Espera y retorna otra
  .then(detalle  => console.log("Detalle:", detalle));

// RETO: usando la fake API de Platzi, obtener un usuario, convertirlo a JSON, 
// Transformar el string a UpperCase, mostrar su role e imprimirlo en consola

fetch("https://api.escuelajs.co/api/v1/users/1")
  .then(respuesta => respuesta.json())          // Convierte a JSON
  .then(usuario => usuario.name.toUpperCase())  // Transforma el string
  .then(nombre => console.log(nombre));         // "JHON"