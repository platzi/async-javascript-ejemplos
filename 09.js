// Manejo de errores en fetch
fetch("https://api-que-no-existe.com/datos")
  .then(response => response.json())
  .then(products => console.log(products))
  .catch(error => console.error("Error:", error.message));

// Dónde cae el error importa

fetch("https://excuser-three.vercel.app/v1/excuse/developers/")
  .then(response => response.json()) 
  .then(data => {
    console.log("Excusa:", data[0].excuse);
    throw new Error("fallo tras obtener la excusa"); // 👈 error forzado
  })
  .then(() => console.log("Este .then() se SALTA")) 
  .catch(error => {
    console.error("Capturado:", error.message);
    return "La cadena continúa después del catch"; 
  })
  .then(valor => console.log("Recuperado:", valor));


// Ejemplo de Finally

fetch("https://excuser-three.vercel.app/v1/excuse/developers1/")
  .then(respuesta => respuesta.json())
  .then(data => console.log("Excusa:", data[0].excuse))
  .catch(error => console.error("Error:", error.message))
  .finally(() => {
    cargando = false; // Siempre se ejecuta
    console.log("Cargando:", cargando); // false — tanto si hubo error como si no
  });

// Cadena completa con buenas prácticas

function cargarExcusa() {
  mostrarSpinner();

  fetch("https://excuser-three.vercel.app/v1/excuse/developers/")
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then(data => renderizarExcusa(data[0].excuse))
    .catch(error => mostrarMensajeError(error.message))
    .finally(() => ocultarSpinner());
}