const clavePerfilFinanciero = "perfilFinanciero";
const clavePreferenciaTema = "preferenciaTema";
let perfilFinanciero = null;

function cargarPerfilFinanciero() {
    const perfilGuardado = localStorage.getItem(clavePerfilFinanciero);
    perfilFinanciero = perfilGuardado ? JSON.parse(perfilGuardado) : null;
    return perfilFinanciero;
}

function alternarVistas(mostrarDashboard) {
    const vistaCaracterizacion = document.getElementById("vista-caracterizacion");
    const vistaDashboard = document.getElementById("vista-dashboard");

    vistaCaracterizacion.classList.toggle("oculto", mostrarDashboard);
    vistaDashboard.classList.toggle("oculto", !mostrarDashboard);
}

function mostrarVistaInicial() {
    const perfilCargado = cargarPerfilFinanciero();
    alternarVistas(Boolean(perfilCargado));

    if (perfilCargado) {
        actualizarResumen();
    }
}

function aplicarTema(tema) {
    const modoOscuro = tema === "oscuro";
    document.documentElement.classList.toggle("tema-oscuro", modoOscuro);

    const botonTema = document.getElementById("cambiar-tema");
    botonTema.textContent = modoOscuro ? "☀" : "☾";
    botonTema.setAttribute("aria-label", modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
}

function alternarTema() {
    const modoOscuro = document.documentElement.classList.contains("tema-oscuro");
    const nuevoTema = modoOscuro ? "claro" : "oscuro";
    localStorage.setItem(clavePreferenciaTema, nuevoTema);
    aplicarTema(nuevoTema);
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarTema(localStorage.getItem(clavePreferenciaTema) || "claro");
    document.getElementById("cambiar-tema").addEventListener("click", alternarTema);
    mostrarVistaInicial();
});
