const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = true;
        if (exito) {
            resolve("La operación fue exitosa");
        } else {
            reject("La operación falló");
        }
    }, 2000);
})

// console.log(miPromesa);

// Los estados de las promesas son inmutables

const promesaResuelta = new Promise((resolve, reject) => {
  resolve("primer valor");
  resolve("segundo valor"); // Ignorado — ya estaba fulfilled
  reject(new Error("error")); // Ignorado — ya estaba fulfilled
});

//promesaResuelta.then(valor => console.log(valor)); // "primer valor"


// Consumir valores de una promesa con .then() y a

function obtenerNombre(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        reject(new Error("Algo salió mal"));
      } else {
        resolve("María");
      }
    }, 500);
  });
}

// Cambia true por false para ver el otro comportamiento
obtenerNombre(false)
  .then(nombre => {
    console.log("Hola,", nombre);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });


// Aplicación real, llamando API Colombia

fetch("https://api-colombia.com/api/v1/Department")
  .then((res) => res.json())
  .then((departments) => {
    console.log("Primer departamento:", departments[35].name);

    departments.forEach((dep) => {
      console.log(`${dep.name}: ${dep.population}`);
    });
  })
  .catch((error) => {
    console.error("Error consultando API Colombia:", error);
  });