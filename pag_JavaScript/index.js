document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario-consulta');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombreValido = validarNombre();
        const apellidoValido = validarApellido();
        const telefonoValido = validarTelefono();
        const emailValido = validarEmail();
        const consultaValida = validarConsulta();



        if (nombreValido && apellidoValido && telefonoValido && emailValido && consultaValida) {
            mostrarConfirmacion();
        }
    });


    function validarNombre() {
        const Nombre = document.getElementById("Nombre").value;
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const errorNombre = document.getElementById('nombre-error');
        if (Nombre === '') {
            errorNombre.textContent = 'El nombre es obligatorio.';
            return false;
        }
        if (Nombre.length < 5 || Nombre.length > 30) {
            errorNombre.textContent = 'El nombre debe tener entre 5 y 30 caracteres.';
            return false;
        }
        if (!regex.test(Nombre)) {
            errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
            return false;
        } else {
            errorNombre.textContent = '';
            return true;
        }
    }

    function validarApellido() {
        const Apellido = document.getElementById("Apellido").value;
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const errorApellido = document.getElementById("apellido-error");

        if (Apellido === "") {
            errorApellido.textContent = "El apellido es obligatorio";
            return false;
        }
        if(Apellido.length < 5 || Apellido.length > 30) {
            errorApellido.textContent = "Debe contener entre 5 y 30 caracteres.";
            return false;
        }
        if (!regex.test(Apellido)) {
            errorApellido.textContent = "Solo letras y espacios"
            return false;
        } else {
            errorApellido.textContent = "";
            return true;
        }
    }

    function validarTelefono() {
        const Telefono = document.getElementById("Telefono").value;
        const regex = /^\d{10}$/;
        const errorTelefono = document.getElementById("telefono-error");

        if (Telefono === "") {
            errorTelefono.textContent = "Ingrese un numero de telefono";
            return false;
        }
        if (!regex.test(Telefono)) {
            errorTelefono.textContent = "Debe contener al menos 10 digitos";
            return false;
        } else {
            errorTelefono.textContent = "";
            return true;
        }
    }
    //Seguir con las funciones acá






    //Eventos
    document.getElementById("Nombre").addEventListener("blur", validarNombre);
    document.getElementById("Nombre").addEventListener("input", () => {
        document.getElementById("nombre-error").textContent = "";
    })

    document.getElementById("Apellido").addEventListener("blur", validarApellido);
    document.getElementById("Apellido").addEventListener("input", () => {
        document.getElementById("apellido-error").textContent = "";
    })

    document.getElementById("Telefono").addEventListener('blur', validarTelefono);
    document.getElementById("Telefono").addEventListener('input', () => {
        document.getElementById('telefono-error').textContent = '';
    });

    //seguir con los eventos acá

});