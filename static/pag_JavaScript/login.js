document.getElementById('form-login').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const datos = {
    usuario: form.usuario.value.trim(),
    password: form.password.value,
  };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    const resultado = await response.json();
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = resultado.mensaje;
    mensajeDiv.style.color = response.ok ? 'green' : 'red';

    if (response.ok) {
      // Redirigir a la página principal luego de 1.5 segundos
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
    }
  } catch (error) {
    console.error('Error en el login:', error);
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = 'Error en el servidor.';
    mensajeDiv.style.color = 'red';
  }
});