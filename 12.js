// // Manejo de errores try/catch
// async function cargarUsuario(id) {
//   try {
//     const respuesta = await fetch(`https://api2.escuelajs.co/api/v1/users/${id}`);
//     const usuario = await respuesta.json();
//     console.log(usuario.name);
//   } catch (error) {
//     console.error("error al cargar usuario",error.message);
//   } 
// }

// cargarUsuario(1);

// // Finally, limpieza garantizada

// async function cargarPerfil(userId) {
//   mostrarSpinner();

//   try {
//     const respuesta = await fetch(`https://api.escuelajs.co/api/v1/users/${userId}`);

//     if (!respuesta.ok) {
//       throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
//     }

//     const perfil = await respuesta.json();
//     renderizarPerfil(perfil);

//   } catch (error) {
//     mostrarError(error.message);

//   } finally {
//     ocultarSpinner(); // Siempre se ejecuta — con o sin error
//   }
// }

// Errores personalizados
// async function obtenerProducto(id) {
//   try {
//     const respuesta = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

//     // fetch no rechaza con errores HTTP 4xx o 5xx — hay que verificar
//     if (!respuesta.ok) {
//       throw new Error(`Producto no encontrado (${respuesta.status})`);
//     }

//     const producto = await respuesta.json();

//     if (!producto || !producto.id) {
//       throw new Error("Producto inválido o sin datos");
//     }

//     console.log(producto.title);
//     return producto;

//   } catch (error) {
//     console.error(error.message);
//     return null; // Valor por defecto ante el error
//   }
// }

// obtenerProducto(999);


// Múltiples try/catch: cuándo separarlos

async function procesarPedido(pedidoId) {
  let usuario;
  let inventario;

  // Error al obtener usuario — crítico, no podemos continuar
  try {
    usuario = await obtenerUsuario(pedidoId);
  } catch (error) {
    throw new Error("No se pudo identificar al usuario"); // Relanza el error
  }

  // Error al obtener inventario — podemos continuar con stock por defecto
  try {
    inventario = await obtenerInventario();
  } catch (error) {
    console.warn("Inventario no disponible, usando caché");
    inventario = obtenerInventarioCached();
  }

  return procesarConDatos(usuario, inventario);
}



// Con Promesas y .catch()
function cargarCategorias() {
  return fetch("https://api.escuelajs.co/api/v1/categories")
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then(datos => renderizar(datos))
    .catch(error => mostrarError(error.message))
    .finally(() => ocultarSpinner());
}

// Con async/await y try/catch — equivalente exacto
async function cargarCategorias() {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const datos = await res.json();
        renderizar(datos);
    } catch (error) {
        mostrarError(error.message);
    } finally {
        ocultarSpinner();
    }
}