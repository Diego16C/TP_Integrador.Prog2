document.getElementById('form-login').addEventListener('submit', async function (e) {
  e.preventDefault();

  const datos = {
    usuario: document.getElementById('usuario').value.trim(),
    password: document.getElementById('password').value.trim()
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
      // Redirige si el login es exitoso (opcional)
      setTimeout(() => {
        window.location.href = '/catalogo';
      }, 1500);
    }

  } catch (error) {
    console.error('Error en el servidor:', error);
    document.getElementById('mensaje').innerText = 'Error en el servidor.';
  }
});