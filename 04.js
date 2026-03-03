const numeros = [1, 2, 3];

numeros.forEach(function(numero) {
  console.log(numero);
});

numeros.forEach((numero) => {
  console.log(numero);
});

const dobles = numeros.map((numero) => {
  return numero * 2;
});

// console.log(dobles);

const pares = numeros.filter((numero) => {
  return numero % 2 === 0;
});

// console.log(pares);

// Callback Sincrono

console.log("antes");
[1,2,3].forEach(n => console.log(n));
console.log("despues");

// Callback Asincrono

console.log("antes");
setTimeout(() => console.log("despues"), 0);
console.log("entre");


// Ejemplos 

// setTimeout: ejecuta el callback después de N milisegundos
setTimeout(() => {
  console.log("Han pasado 2 segundos");
}, 2000);

// addEventListener: ejecuta el callback cuando ocurre un evento
document.querySelector("button").addEventListener("click", () => {
  console.log("El usuario hizo clic");
});

// En ambos casos: tú defines la función, el entorno decide cuándo llamarla
