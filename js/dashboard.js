function leerPerfilGuardado() {
    const perfilGuardado = localStorage.getItem(clavePerfilFinanciero);
    return perfilGuardado ? JSON.parse(perfilGuardado) : null;
}

function formatearMonto(monto) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 2
    }).format(monto);
}

function pintarHistorialGastosFijos(gastosFijos) {
    const listaGastos = document.getElementById("lista-gastos-fijos-historial");
    listaGastos.innerHTML = "";

    gastosFijos.forEach((gasto) => {
        const fila = document.createElement("tr");
        const nombre = document.createElement("td");
        const valorTotal = document.createElement("td");
        const compartido = document.createElement("td");
        const aporte = document.createElement("td");

        nombre.textContent = gasto.nombre;
        valorTotal.textContent = formatearMonto(gasto.montoTotal);
        compartido.textContent = gasto.compartido ? "Sí" : "No";
        aporte.textContent = formatearMonto(gasto.valorReal);

        fila.append(nombre, valorTotal, compartido, aporte);
        listaGastos.appendChild(fila);
    });
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
    pintarHistorialGastosFijos(Array.isArray(perfil.gastosFijos) ? perfil.gastosFijos : []);
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
