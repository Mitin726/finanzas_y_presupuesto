const clavePerfilFinanciero = "perfilFinanciero";

function existePerfilFinanciero() {
    return localStorage.getItem(clavePerfilFinanciero) !== null;
}

function alternarVistas(mostrarDashboard) {
    const vistaCaracterizacion = document.getElementById("vista-caracterizacion");
    const vistaDashboard = document.getElementById("vista-dashboard");

    vistaCaracterizacion.classList.toggle("oculto", mostrarDashboard);
    vistaDashboard.classList.toggle("oculto", !mostrarDashboard);
}

function mostrarVistaInicial() {
    alternarVistas(existePerfilFinanciero());
}

document.addEventListener("DOMContentLoaded", mostrarVistaInicial);
