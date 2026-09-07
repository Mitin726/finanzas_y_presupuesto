function leerPerfilGuardado() {
    const perfilGuardado = localStorage.getItem(clavePerfilFinanciero);
    return perfilGuardado ? JSON.parse(perfilGuardado) : null;
}

function actualizarResumen() {
    const perfil = leerPerfilGuardado();
    const gastos = leerGastosDiarios();

    if (!perfil) {
        return;
    }

    const totalGastosVariables = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    const saldoDisponible = perfil.totalIngresos - perfil.totalGastosFijosReales - totalGastosVariables;
    document.getElementById("total-ingresos").textContent = perfil.totalIngresos;
    document.getElementById("total-gastos-fijos").textContent = perfil.totalGastosFijosReales;
    document.getElementById("saldo-disponible").textContent = saldoDisponible;
    document.getElementById("gastos-variables").textContent = totalGastosVariables;
    document.querySelector(".resumen-card-principal").classList.toggle("saldo-negativo", saldoDisponible < 0);
}

function limpiarFormularioCaracterizacion() {
    const formulario = document.getElementById("formulario-caracterizacion");
    const listaGastos = document.getElementById("lista-gastos-fijos");

    formulario.reset();
    listaGastos.innerHTML = "";
}

function resetearConfiguracion() {
    localStorage.removeItem(clavePerfilFinanciero);
    localStorage.removeItem(claveGastosDiarios);
    gastosDiarios = [];
    pintarGastosDiarios();
    perfilFinanciero = null;
    limpiarFormularioCaracterizacion();
    alternarVistas(false);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetear-configuracion").addEventListener("click", resetearConfiguracion);
});
