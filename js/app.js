const clavePerfilFinanciero = "perfilFinanciero";
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
    alternarVistas(Boolean(cargarPerfilFinanciero()));
}

document.addEventListener("DOMContentLoaded", mostrarVistaInicial);
