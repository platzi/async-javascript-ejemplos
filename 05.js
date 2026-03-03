import fs from "fs";

try {
  let usuario = undefined;
  console.log(usuario.nombre); // error porque usuario es undefined
} catch (error) {
  console.log("No se pudo leer la propiedad");
}


// El problema con try/catch y asincronía


// ❌ try/catch NO funciona con callbacks asíncronos
try {
  setTimeout(() => {
    throw new Error("Algo salió mal"); // Este error NO lo atrapa el try/catch
  }, 1000);
} catch (error) {
  console.log("Nunca llega aquí"); // Nunca se ejecuta
}

// El try/catch ya terminó cuando el callback se ejecuta.
// El error queda sin manejar y puede crashear el proceso.


// la convención de callbacks con error-first

fs.readFile("archivo.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error leyendo el archivo:", err.message);
    return;
  }
  console.log("Contenido:", data);
});


// Estructura de error-first

function callback(error, resultado) {}

// Error-first en APIs de Node.js

const fs = require("fs");

// fs.readFile sigue exactamente la convención error-first
fs.readFile("archivo.txt", "utf8", function(error, datos) {
  if (error) {
    console.error("No se pudo leer el archivo:", error.message);
    return;
  }
  console.log("Contenido:", datos);
});

// Lo mismo con fs.writeFile
fs.writeFile("salida.txt", "Hola mundo", function(error) {
  if (error) {
    console.error("Error al escribir:", error.message);
    return;
  }
  console.log("Archivo guardado correctamente");
});



// ❌ Sin return — código peligroso
function procesarDatos(error, datos) {
  if (error) {
    console.error("Error:", error.message);
    // ¡Falta el return! La función sigue ejecutándose
  }
  console.log(datos.length); // 💥 TypeError si datos es null
}

// ✅ Con return — código seguro
function procesarDatos(error, datos) {
  if (error) {
    console.error("Error:", error.message);
    return; // Corta la ejecución aquí
  }
  console.log(datos.length); // Solo llega aquí si no hubo error
}
