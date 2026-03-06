function salud() {
    return "hola";
}

console.log(salud());

// async function

async function saludAsync() {
    return "hola async";
}

console.log(await saludAsync()); // Promise.resolve(valor);

// ANTES PROMESAS

function obtenerUsuario(id) {
  return fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
}

// AHORA ASYNC/AWAIT

async function obtenerUsuarioAsync(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const usario = await obtenerUsuarioAsync(2);
console.log(usario.name);


// mini ejemplo
fetch("/api/user")
  .then(res => res.json())
  .then(data => console.log(data));

// async/await
const res = await fetch("/api/user");
const data = await res.json();
console.log(data);

// async en distintas formas de función 

// Declaración de función
async function cargar () {/*codigo*/}

// Expresión de función
const cargar = async function() {/*codigo*/}

// Arrow function
const cargar = async () => {/*codigo*/}

// Método de clase
class ServicioUsuarios {
    async obtener() {/*codigo*/}
}

// RETO: usar la siguiente API para obtener datos de usuarios y utilizar las cuatro primeras formas de función
// fetch https://jsonplaceholder.typicode.com/users/

// Respuesta:

const URL = "https://jsonplaceholder.typicode.com/users/";

// Declaración de función
async function cargar() {
  const res = await fetch(URL);
  const data = await res.json();
  console.log("Declaración:", data);
}

// Expresión de función
const cargar2 = async function() {
  const res = await fetch(URL);
  const data = await res.json();
  console.log("Expresión:", data);
}

// Arrow function
const cargar3 = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  console.log("Arrow:", data);
}

// Método de objeto
const apiObjeto = {
  async obtener() {
    const res = await fetch(URL);
    const data = await res.json();
    console.log("Objeto:", data);
  }
}

// Llamadas
cargar();
cargar2();
cargar3();
api.obtener();

