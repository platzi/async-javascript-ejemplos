// Operaciones en secuencia
async function cargarDashboard() {
  // Cada await espera al anterior = 900ms total
  const usuario    = await obtenerUsuario();  // 300 ms
  const repos  = await obtenerRepos();  // 400 ms
  const orgs = await obtenerOrgs(); // 200 ms

  return { usuario, repos, orgs };
}

// Operaciones en paralelo
async function cargarDashboardParalelo() {
  // Todas las llamadas inician al mismo tiempo
  const [usuario, repos, orgs] = await Promise.all([
    obtenerUsuario(),  // 300 ms
    obtenerRepos(),    // 400 ms
    obtenerOrgs()      // 200 ms
  ]);

  return { usuario, repos, orgs };
}

// Ejemplo con API de GitHub

// ❌ Sigue siendo secuencial aunque uses Promise.all
// El await antes de cada llamada las ejecuta de una en una
const username = 'lizzparody';

const usuario = await fetch(`https://api.github.com/users/${username}`).then(r => r.json()); // 300ms 🛑 ESPERA

// Estas dos no empiezan hasta que la de arriba termina
const [repos, orgs] = await Promise.all([
  fetch(`https://api.github.com/users/${username}/repos`).then(r => r.json()), // 400ms
  fetch(`https://api.github.com/users/${username}/orgs`).then(r => r.json())   // 200ms
]);



// ✅ Paralelo correcto — iniciar todo antes del await
const obtenerPerfilCompleto = async (username) => {
  const urlBase = `https://api.github.com/users/${username}`;

  const [usuario, repos, orgs] = await Promise.all([ // lanzamos tres peticiones a GitHub y esperamos a que todas terminen
    fetch(urlBase).then(res => res.json()),
    fetch(`${urlBase}/repos`).then(res => res.json()),
    fetch(`${urlBase}/orgs`).then(res => res.json())
  ]);

  // Filtramos solo lo que nos importa
  return {
    nombre: usuario.name,
    bio: usuario.bio,
    seguidores: usuario.followers,
    totalRepos: repos.length,
    nombresRepos: repos.slice(0, 3).map(repo => repo.name), // Solo los primeros 3
    organizaciones: orgs.map(org => org.login)
  };
};

const res = await obtenerPerfilCompleto('lizzparody'); // esperamos a que la función termine
console.log(res);

// Cuando ejecutar en secuencia

async function obtenerEstadisticasRepo(username) { 
  // Necesita el usuario para verificar que existe
  const usuario = await obtenerUsuario(username);

  // Necesita el usuario para buscar sus repos
  const repos = await obtenerRepos(usuario.login);

  // Necesita los repos para encontrar el más popular
  const repoTop = await obtenerRepoMasPopular(repos);

  // Necesita el repo más popular para traer sus commits
  const commits = await obtenerCommits(repoTop.nombre);

  return commits;
}
// Aquí la secuencia es correcta — cada paso depende del anterior


// Patrón mixto - secuencial y paralelo juntos

async function cargarPerfilRepo(repoId, usuarioId) {
  // Primero obtenemos el repo (necesario para todo lo demás)
  const repo = await obtenerRepo(repoId);

  // Con el repo ya disponible, lanzamos en paralelo
  // todo lo que no depende entre sí
  const [issues, forks, contributors] = await Promise.all([
    obtenerIssues(repo.id),
    obtenerForks(repo.nombre),
    obtenerContributors(repo.id, usuarioId),
  ]);

  return { repo, issues, forks, contributors };
}