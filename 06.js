// Callback Hell - Anidamiento profundo
login(usuario, function(err, user) {
  if (err) return manejarError(err);

  obtenerPerfil(user, function(err, perfil) {
    if (err) return manejarError(err);

    obtenerPermisos(perfil, function(err, permisos) {
      if (err) return manejarError(err);

      cargarDashboard(permisos, function(err, dashboard) {
        if (err) return manejarError(err);

        console.log("Todo listo");
      });
    });
  });
});



// Flujo realista de una app: login → perfil → posts → comentarios
login(credenciales, function(err, sesion) {
  if (err) { return manejarError(err); }
  actualizarUI("Cargando perfil...");

  obtenerPerfil(sesion.userId, function(err, perfil) {
    if (err) { return manejarError(err); }
    renderizarPerfil(perfil);

    obtenerPosts(perfil.id, function(err, posts) {
      if (err) { return manejarError(err); }
      renderizarPosts(posts);

      obtenerComentarios(posts[0].id, function(err, comentarios) {
        if (err) { return manejarError(err); }
        renderizarComentarios(comentarios);

        // En este punto ya nadie sabe qué está pasando
      });
    });
  });
});


// El intento de solución: funciones nombradas
// ✅ Más legible visualmente...
function manejarUsuario(err, usuario) {
  if (err) { return console.error(err); }
  obtenerPedidos(usuario.id, manejarPedidos);
}

function manejarPedidos(err, pedidos) {
  if (err) { return console.error(err); }
  obtenerProducto(pedidos[0].productoId, manejarProducto);
}

function manejarProducto(err, producto) {
  if (err) { return console.error(err); }
  console.log("Producto:", producto.nombre);
}

obtenerUsuario(1, manejarUsuario);