document.getElementById('form-registro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    apellido: document.getElementById('apellido').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    usuario: document.getElementById('usuario').value.trim(),
    password: document.getElementById('password').value.trim()
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

  } catch (error) {
    console.error('Error al registrar:', error);
    document.getElementById('mensaje').innerText = 'Error en el servidor.';
  }
});