function leerPerfilGuardado() {
    const perfilGuardado = localStorage.getItem(clavePerfilFinanciero);
    return perfilGuardado ? JSON.parse(perfilGuardado) : null;
}

function actualizarResumen() {
    const perfil = leerPerfilGuardado();

    if (!perfil) {
        return;
    }

    document.getElementById("total-ingresos").textContent = perfil.totalIngresos;
    document.getElementById("total-gastos-fijos").textContent = perfil.totalGastosFijosReales;
    document.getElementById("saldo-disponible").textContent = perfil.saldoDisponibleBase;
    document.getElementById("gastos-variables").textContent = "0";
}

function limpiarFormularioCaracterizacion() {
    const formulario = document.getElementById("formulario-caracterizacion");
    const listaGastos = document.getElementById("lista-gastos-fijos");

    formulario.reset();
    listaGastos.innerHTML = "";
}

function resetearConfiguracion() {
    localStorage.removeItem(clavePerfilFinanciero);
    perfilFinanciero = null;
    limpiarFormularioCaracterizacion();
    alternarVistas(false);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetear-configuracion").addEventListener("click", resetearConfiguracion);
});
