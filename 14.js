// Regla base de la conversión
Promise.then(resultado => algo(resultado))
         
const resultado = await promesa;
algo(resultado);

// Ejemplos:
// ── Con Promesas ──────────────────────────────────────
function obtenerTitulo(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(respuesta => respuesta.json())
    .then(post => post.title.toUpperCase())
    .catch(error => console.error(error.message));
}

// ── Con async/await ───────────────────────────────────
async function obtenerTitulo(postId) {
  try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await respuesta.json();
    return post.title.toUpperCase();
  } catch (error) {
    console.error(error.message);
  }
}

// Ejemplo #2

// ── Con Promesas ──────────────────────────────────────
function cargarPerfil(userId) {
  return obtenerUsuario(userId)
    .then(usuario => {
      renderizarAvatar(usuario.foto);
      return obtenerPostsDeUsuario(usuario.id);
    })
    .then(posts => {
      renderizarPosts(posts);
      return obtenerComentarios(posts[0].id);
    })
    .then(comentarios => renderizarComentarios(comentarios))
    .catch(error => mostrarError(error.message))
    .finally(() => ocultarSpinner());
}

// ── Con async/await ───────────────────────────────────
async function cargarPerfil(userId) {
  try {
    const usuario = await obtenerUsuario(userId);
    renderizarAvatar(usuario.foto);

    const posts = await obtenerPostsDeUsuario(usuario.id);
    renderizarPosts(posts);

    const comentarios = await obtenerComentarios(posts[0].id);
    renderizarComentarios(comentarios);

  } catch (error) {
    mostrarError(error.message);
  } finally {
    ocultarSpinner();
  }
}

// Ejemplo #3 con Promise.all

// ── Con Promesas ──────────────────────────────────────
function inicializarApp(userId) {
  return Promise.all([
    obtenerUsuario(userId),
    obtenerNotificaciones(userId),
    obtenerConfiguracion(),
  ])
    .then(([usuario, notificaciones, config]) => {
      aplicarConfig(config);
      renderizarHeader(usuario);
      mostrarNotificaciones(notificaciones);
    })
    .catch(error => console.error("Error al inicializar:", error.message));
}

// ── Con async/await ───────────────────────────────────
async function inicializarApp(userId) {
  try {
    const [usuario, notificaciones, config] = await Promise.all([
      obtenerUsuario(userId),
      obtenerNotificaciones(userId),
      obtenerConfiguracion(),
    ]);

    aplicarConfig(config);
    renderizarHeader(usuario);
    mostrarNotificaciones(notificaciones);

  } catch (error) {
    console.error("Error al inicializar:", error.message);
  }
}

// Cuando es mejor mantener promesas .then()
const nombre = await fetch("/api/usuario/1")
  .then(res => res.json())
  .then(u => u.nombre);