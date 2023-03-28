/* Variables buscador */
const input = document.querySelector("#buscador");
const cards = document.querySelectorAll(".card");
const mensajeError = document.querySelector("#error_buscador");
console.log(input);
console.log(cards);

// Escuchar lo que se ingresa en el input
input.addEventListener("keyup", function () {
  const valorBusqueda = input.value.toLowerCase();
  console.log(valorBusqueda);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const texto = card.textContent.toLocaleLowerCase();
    let resultadosEncontrados = false;

    if (texto.includes(valorBusqueda)) {
      card.style.display = "block";
      resultadosEncontrados = true;
    } else {
      card.style.display = "none";
    }

    if (!resultadosEncontrados) {
      mensajeError.style.display = "block";
    } else {
      mensajeError.style.display = "block";
    }
  }
});
