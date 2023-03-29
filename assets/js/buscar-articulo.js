/* Variables Selector */
const buscador = document.querySelector("#buscador");
const buscarBtn = document.getElementById("buscar-btn");
const cards = document.querySelectorAll(".card");
const errorBuscador = document.querySelector("#error_buscador");

buscarBtn.addEventListener("click", (e) => {
  e.preventDefault(); // previene que se recarge la pagina
  const valorBusqueda = buscador.value.toLowerCase();

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const texto = card.textContent.toLocaleLowerCase();
    let resultadoEncontrado = false;

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
