document.addEventListener('DOMContentLoaded', function(){

    let formulario = document.getElementById('contactForm')

    formulario.addEventListener('submit', function(e){
        e.preventDefault()

    })

    // validar nombre

    let nombreIngresado = document.getElementById('nombre');
    nombreIngresado.addEventListener('blur', validarNombre);

    function validarNombre(){
        let nombre = nombreIngresado.value.trim()
        let error = document.getElementById('nombre-error');
        let regex = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/;

        if(nombre === ''){
            error.textContent = 'Este campo es obligatorio';
            error.style.color = 'red';
        } else if(!regex.test(nombre)){
            error.textContent = 'Debe escribir un nombre valido';
            error.style.color = 'red';
        } else {
            error.textContent = '';
        }
    }

});


