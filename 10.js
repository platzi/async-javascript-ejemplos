// Ejecución secuencial innecesaria
const usuario   = await obtenerUsuario(1); // 300ms
const productos = await obtenerProductos(); // 200ms
const config    = await obtenerConfig(); // 400ms

Promise.all 

const fetchProducto = id =>
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then(r => {
      if (!r.ok) throw new Error(`Error ${r.status}`);
      return r.json();
    });

// Si todas tienen éxito, funciona
Promise.all([fetchProducto(4), fetchProducto(5), fetchProducto(6)])
  .then(productos => {
    productos.forEach(p => console.log(`${p.title} - $${p.price}`));
  })
  .catch(error => console.error(error.message));

//Si una falla, todas fallan

Promise.all([fetchProducto(4), fetchProducto(999), fetchProducto(6)])
  .then(productos => {
    productos.forEach(p => console.log(`${p.title} - $${p.price}`));
  })
  .catch(error => console.error(error.message));
 
// Promise.allSettled: espera a que todas las promesas terminen sin importar el resultado

Promise.allSettled([
  Promise.resolve("éxito"),
  Promise.reject(new Error("fallo")),
  Promise.resolve("también éxito"),
])
  .then(resultados => {
    resultados.forEach(resultado => {
      if (resultado.status === "fulfilled") {
        console.log("✅ Valor:", resultado.value);
      } else {
        console.log("❌ Error:", resultado.reason.message);
      }
    });
  });


// Promise.race: devuelve la primera promesa que se resuelva

const rapida  = new Promise(resolve => setTimeout(() => resolve("rápida"),  100));
const lenta   = new Promise(resolve => setTimeout(() => resolve("lenta"),   500));
const mediana = new Promise(resolve => setTimeout(() => resolve("mediana"), 300));

Promise.race([rapida, lenta, mediana])
  .then(ganadora => console.log("Ganó:", ganadora));

// Ejemplo práctico de Promise.race: timeout en peticiones

const peticion = fetch("https://api.escuelajs.co/api/v1/products/4");
const timeout  = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Tiempo de espera agotado")), 1000)
);

Promise.race([peticion, timeout])
  .then(res => res.json())
  .then(producto => console.log(`${producto.title} - $${producto.price}`))
  .catch(error => console.error(error.message)); // "Tiempo de espera agotado"


// Promise.any: devuelve la primera promesa que se resuelva exitosamente

Promise.any([
  Promise.reject(new Error("fallo 1")),
  Promise.resolve("éxito"),               // ← Esta gana
  Promise.resolve("también éxito"),
])
  .then(primero => console.log("Primera exitosa:", primero)); // "éxito"

// Si todas fallan, lanza un AggregateError
Promise.any([
  Promise.reject(new Error("fallo 1")),
  Promise.reject(new Error("fallo 2")),
])
  .catch(error => {
    console.error(error.constructor.name); // "AggregateError"
    console.error(error.errors);           // [Error: fallo 1, Error: fallo 2]
  });