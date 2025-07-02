document.getElementById('form-registro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const datos = {
    nombre: form.nombre.value.trim(),
    apellido: form.apellido.value.trim(),
    email: form.email.value.trim(),
    telefono: form.telefono.value.trim(),
    usuario: form.usuario.value.trim(),
    password: form.password.value,
  };

  try {
    const respuesta = await fetch('/api/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();
    const mensajeDiv = document.getElementById('mensaje');
    
    mensajeDiv.innerText = resultado.mensaje;
    mensajeDiv.style.color = respuesta.ok ? 'green' : 'red';

    if (respuesta.ok) {
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    }

} catch (error) {
    console.error('Error al registrar:', error);
    document.getElementById('mensaje').innerText = 'Error en el servidor.';
}
});