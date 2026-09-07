const claveGastosDiarios = "gastosDiarios";
let gastosDiarios = [];

function leerGastosDiarios() {
    const gastosGuardados = localStorage.getItem(claveGastosDiarios);
    gastosDiarios = gastosGuardados ? JSON.parse(gastosGuardados) : [];
    return gastosDiarios;
}

function guardarGastosDiarios() {
    localStorage.setItem(claveGastosDiarios, JSON.stringify(gastosDiarios));
}

function pintarGastosDiarios() {
    const listaGastos = document.getElementById("lista-gastos-diarios");
    listaGastos.innerHTML = "";

    gastosDiarios.forEach((gasto) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${gasto.concepto}</td>
            <td>${gasto.monto}</td>
            <td>${gasto.categoria}</td>
            <td><button type="button" class="btn btn-sm btn-outline-danger eliminar-gasto-diario" data-gasto-id="${gasto.id}">Eliminar</button></td>
        `;
        listaGastos.appendChild(fila);
    });
}

function registrarGastoDiario(evento) {
    evento.preventDefault();

    const nuevoGasto = {
        id: Date.now().toString(),
        concepto: document.getElementById("concepto-gasto-diario").value,
        monto: Number(document.getElementById("monto-gasto-diario").value),
        categoria: document.getElementById("categoria-gasto-diario").value
    };

    gastosDiarios.push(nuevoGasto);
    guardarGastosDiarios();
    pintarGastosDiarios();
    actualizarResumen();
    evento.currentTarget.reset();
}

function eliminarGastoDiario(evento) {
    const gastoId = evento.target.dataset.gastoId;
    gastosDiarios = gastosDiarios.filter((gasto) => gasto.id !== gastoId);
    guardarGastosDiarios();
    pintarGastosDiarios();
    actualizarResumen();
}

document.addEventListener("DOMContentLoaded", () => {
    leerGastosDiarios();
    pintarGastosDiarios();
    document.getElementById("formulario-gasto-diario").addEventListener("submit", registrarGastoDiario);
    document.getElementById("lista-gastos-diarios").addEventListener("click", (evento) => {
        if (evento.target.classList.contains("eliminar-gasto-diario")) {
            eliminarGastoDiario(evento);
        }
    });
});
