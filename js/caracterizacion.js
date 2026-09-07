let siguienteGastoId = 1;

function agregarGastoFijo() {
    const gastoId = siguienteGastoId;
    siguienteGastoId += 1;

    const gasto = document.createElement("div");
    gasto.className = "gasto-fijo";
    gasto.dataset.gastoId = gastoId;
    gasto.innerHTML = `
        <label for="nombre-gasto-${gastoId}">Nombre o concepto del gasto</label>
        <input type="text" id="nombre-gasto-${gastoId}" class="nombre-gasto" required>

        <label for="monto-gasto-${gastoId}">Monto total del gasto</label>
        <input type="number" id="monto-gasto-${gastoId}" class="monto-gasto" required>

        <label>
            <input type="checkbox" class="gasto-compartido">
            Gasto compartido
        </label>

        <div class="opciones-compartido oculto">
            <label>
                <input type="radio" name="metodo-gasto-${gastoId}" value="porcentaje" class="metodo-gasto" checked>
                Porcentaje de aporte personal
            </label>
            <label>
                <input type="radio" name="metodo-gasto-${gastoId}" value="personas" class="metodo-gasto">
                Cantidad de personas con quienes se divide
            </label>
            <label for="valor-metodo-${gastoId}">Valor del método</label>
            <input type="number" id="valor-metodo-${gastoId}" class="valor-metodo">
        </div>

        <button type="button" class="eliminar-gasto">Eliminar gasto</button>
    `;

    const listaGastos = document.getElementById("lista-gastos-fijos");
    listaGastos.appendChild(gasto);

    gasto.querySelector(".gasto-compartido").addEventListener("change", alternarCamposCompartido);
    gasto.querySelectorAll(".metodo-gasto").forEach((metodo) => {
        metodo.addEventListener("change", actualizarCampoMetodo);
    });
    gasto.querySelector(".eliminar-gasto").addEventListener("click", eliminarGastoFijo);
    actualizarCampoMetodo({ currentTarget: gasto.querySelector(".metodo-gasto:checked") });
}

function eliminarGastoFijo(evento) {
    const gasto = evento.currentTarget.closest(".gasto-fijo");
    gasto.remove();
}

function alternarCamposCompartido(evento) {
    const gasto = evento.currentTarget.closest(".gasto-fijo");
    const opciones = gasto.querySelector(".opciones-compartido");
    opciones.classList.toggle("oculto", !evento.currentTarget.checked);
}

function actualizarCampoMetodo(evento) {
    const gasto = evento.currentTarget.closest(".gasto-fijo");
    const valorMetodo = gasto.querySelector(".valor-metodo");
    valorMetodo.min = evento.currentTarget.value === "porcentaje" ? "1" : "2";
    valorMetodo.max = evento.currentTarget.value === "porcentaje" ? "100" : "";
    valorMetodo.placeholder = evento.currentTarget.value === "porcentaje" ? "Porcentaje de 1 a 100" : "Cantidad de personas mayor a 1";
}

function calcularValorReal(gasto) {
    const montoTotal = Number(gasto.querySelector(".monto-gasto").value);

    if (!gasto.querySelector(".gasto-compartido").checked) {
        return montoTotal;
    }

    const metodo = gasto.querySelector(".metodo-gasto:checked").value;
    const valorMetodo = Number(gasto.querySelector(".valor-metodo").value);

    if (metodo === "porcentaje") {
        return montoTotal * (valorMetodo / 100);
    }

    return montoTotal / valorMetodo;
}

function obtenerGastosFijos() {
    return Array.from(document.querySelectorAll(".gasto-fijo")).map((gasto) => {
        const compartido = gasto.querySelector(".gasto-compartido").checked;
        const metodoSeleccionado = gasto.querySelector(".metodo-gasto:checked");
        const valorMetodo = gasto.querySelector(".valor-metodo");

        return {
            nombre: gasto.querySelector(".nombre-gasto").value,
            montoTotal: Number(gasto.querySelector(".monto-gasto").value),
            compartido,
            metodo: compartido ? metodoSeleccionado.value : null,
            valorMetodo: compartido ? Number(valorMetodo.value) : null,
            valorReal: calcularValorReal(gasto)
        };
    });
}

function guardarConfiguracion(evento) {
    evento.preventDefault();

    const ingresoPrincipal = Number(document.getElementById("ingreso-principal").value);
    const ingresosAdicionales = Number(document.getElementById("ingresos-adicionales").value || 0);
    const gastosFijos = obtenerGastosFijos();
    const totalIngresos = ingresoPrincipal + ingresosAdicionales;
    const totalGastosFijosReales = gastosFijos.reduce((total, gasto) => total + gasto.valorReal, 0);

    const configuracion = {
        ingresoPrincipal,
        ingresosAdicionales,
        gastosFijos,
        totalIngresos,
        totalGastosFijosReales,
        saldoDisponibleBase: totalIngresos - totalGastosFijosReales
    };

    localStorage.setItem(clavePerfilFinanciero, JSON.stringify(configuracion));
    perfilFinanciero = configuracion;
    alternarVistas(true);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("agregar-gasto").addEventListener("click", agregarGastoFijo);
    document.getElementById("formulario-caracterizacion").addEventListener("submit", guardarConfiguracion);
});
