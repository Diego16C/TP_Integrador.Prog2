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
    const response = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    const resultado = await response.json();
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = resultado.mensaje;
    mensajeDiv.style.color = response.ok ? 'green' : 'red';

    if (response.ok) {
      form.reset();
    }
  } catch (error) {
    console.error('Error al registrar:', error);
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = 'Error en el servidor.';
    mensajeDiv.style.color = 'red';
  }
});