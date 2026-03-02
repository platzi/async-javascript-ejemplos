// Macrotasks 

setTimeout(() => console.log("timeout 1"), 0); // espera 0ms
setInterval(() => console.log("interval 1"), 1000); // se ejecuta cada 1000ms
//eventos del DOM
document.addEventListener("click", () => console.log("click 1"));

setImmediate(() => console.log("immediate 1")); 
// se ejecuta después de la fase actual del Event Loop

Microtasks

Promise.resolve().then(() => console.log("promise 1"));
Promise.resolve().then(() => console.log("promise 2"));
queueMicrotask(() => console.log("queueMicrotask 1"));

// Ejemplo 
console.log("Inicio"); // sync

setTimeout(() => { // macrotask
  console.log("Timeout");
}, 100);

Promise.resolve().then(() => { // microtask
  console.log("Promise");
}); 

console.log("Fin"); // sync