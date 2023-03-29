/* Variables Selector */
const buscador = document.querySelector("#buscador");
const cards = document.querySelectorAll(".card");
const errorBuscador = document.querySelector("#error_buscador");

// Buscar la info seleccionada
buscador.addEventListener("click", (e) => {
  e.preventDefault(); // previene que se recarge la pagina
  const valorBusqueda = buscador.value.toLowerCase();

  // Recorrer los articulos y buscar el valor seleccionado
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const texto = card.textContent.toLocaleLowerCase();
    let resultadoEncontrado = false;

    // hacer si el valor incluye la opcion seleccionada
    if (texto.includes(valorBusqueda)) {
      card.style.display = "block";
      resultadoEncontrado = true;
    } else {
      card.style.display = "none";
    }

    if (valorBusqueda === "") {
      errorBuscador.style.display = "block";
      card.style.display = "none";
      resultadoEncontrado = false;
    } else {
      errorBuscador.style.display = "none";
    }
  }
});
