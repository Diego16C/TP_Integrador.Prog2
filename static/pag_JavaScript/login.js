document.getElementById('form-login').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const datos = {
    usuario: form.usuario.value.trim(),
    password: form.password.value,
  };

 try {
    const respuesta = await fetch('/api/login', {
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
            window.location.href = '/catalogo';
        }, 2000);
    }
} catch (error) {
    console.error('Error en login:', error);
    document.getElementById('mensaje').innerText = 'Error en el servidor.';
}
});