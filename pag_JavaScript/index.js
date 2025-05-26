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

    function validarEmail() {
        const email = document.getElementById("Mail").value;
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const errorMail = document.getElementById("mail-error");

        if( email === "") {
            errorMail.textContent = "Ingrese un Email";
            return false;
        }
        if (!regex.test(email)) {
            errorMail.textContent = "Ingrese un mail valido";
            return false;
        } else {
            errorMail.textContent = "";
            return true;
        }
    }

    function validarConsulta() {
        const consulta = document.getElementById("Consulta").value;
        const errorConsulta = document.getElementById("consulta-error");

        if(consulta === "") {
            errorConsulta.textContent = "Ingrese una consulta";
            return false;
        } else {
            errorConsulta.textContent = "";
            return true;
        }
    }

    function mostrarConfirmacion() {
        let mensajeExito = document.getElementById('success-message');
        if (!mensajeExito) {
            mensajeExito = document.createElement('div');
            mensajeExito.id = 'success-message';
            mensajeExito.style.cssText = `
                background-color: #4CAF50;
                color: white;
                text-align: center;
            `;
            formulario.appendChild(mensajeExito);
        }
        
        mensajeExito.textContent = 'Formulario de consulta enviado con exito';
        
        setTimeout(() => {
            mensajeExito.textContent = '';
            formulario.reset();
        }, 3000);
    }





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

    document.getElementById("Mail").addEventListener("blur", validarEmail);
    document.getElementById("Mail").addEventListener("input", () => {
        document.getElementById("mail-error").textContent = "";
    });

    document.getElementById("Consulta").addEventListener("blur", validarEmail);
    document.getElementById("Consulta").addEventListener("input", () => {
        document.getElementById("consulta-error").textContent = "";
    });

    


});