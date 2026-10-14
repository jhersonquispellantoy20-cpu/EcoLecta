const formulario = document.querySelector("#formulario-entrega");
const mensaje = document.querySelector("#mensaje");
const historial = document.querySelector("#historial");

const entregas = JSON.parse(
  localStorage.getItem("ecocolecta-entregas") || "[]"
);

function mostrarEntregas() {
  historial.replaceChildren();

  entregas.forEach((entrega) => {
    const elemento = document.createElement("li");
    elemento.textContent =
      `${entrega.ciudadano}: ${entrega.material}, ${entrega.cantidad} kg`;
    historial.appendChild(elemento);
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const ciudadano = datos.get("ciudadano").trim();
  const material = datos.get("material");
  const cantidad = Number(datos.get("cantidad"));

  if (!ciudadano || !material || !Number.isFinite(cantidad) || cantidad <= 0) {
    mensaje.textContent = "Verifica los datos ingresados.";
    return;
  }

  entregas.push({ ciudadano, material, cantidad });
  localStorage.setItem("ecocolecta-entregas", JSON.stringify(entregas));

  mostrarEntregas();
  mensaje.textContent = "¡Entrega registrada correctamente!";
  formulario.reset();
});

mostrarEntregas();