document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-producto');
    const mensajeDiv = document.getElementById('mensaje');
    const tablaCuerpo = document.querySelector('#tabla-productos tbody');
    const btnCancelar = document.getElementById('btn-cancelar');

    // Carga productos al iniciar
    async function cargarProductos() {
        try {
            const res = await fetch('/api/productos');
            const productos = await res.json();
            tablaCuerpo.innerHTML = '';
            productos.forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion || ''}</td>
                    <td>${p.precio.toFixed(2)}</td>
                    <td>${p.imagen || ''}</td>
                    <td>
                        <button class="editar" data-id="${p.id}">Editar</button>
                        <button class="borrar" data-id="${p.id}">Borrar</button>
                    </td>
                `;
                tablaCuerpo.appendChild(tr);
            });
        } catch (error) {
            mensajeDiv.textContent = 'Error cargando productos.';
            mensajeDiv.style.color = 'red';
        }
    }

    cargarProductos();

    // Limpia formulario
    function limpiarFormulario() {
        form.reset();
        document.getElementById('producto-id').value = '';
        btnCancelar.style.display = 'none';
        document.getElementById('btn-guardar').textContent = 'Agregar Producto';
    }

    // Llena formulario para editar
    function llenarFormulario(producto) {
        document.getElementById('producto-id').value = producto.id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion || '';
        document.getElementById('precio').value = producto.precio;
        document.getElementById('imagen').value = producto.imagen || '';
        btnCancelar.style.display = 'inline-block';
        document.getElementById('btn-guardar').textContent = 'Actualizar Producto';
    }

    // Manejar formulario submit
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const id = document.getElementById('producto-id').value;
        const nombre = document.getElementById('nombre').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);
        const imagen = document.getElementById('imagen').value.trim();
        const usuario = document.getElementById('usuario-admin').value.trim();

        if (!nombre || isNaN(precio)) {
            mensajeDiv.textContent = 'Nombre y precio son obligatorios y deben ser válidos.';
            mensajeDiv.style.color = 'red';
            return;
        }
        if (!usuario) {
            mensajeDiv.textContent = 'Debe ingresar usuario admin para modificar.';
            mensajeDiv.style.color = 'red';
            return;
        }

        const productoData = { nombre, descripcion, precio, imagen, usuario };

        try {
            let res;
            if (id) {
                // Actualizar
                res = await fetch(`/api/productos/${id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(productoData)
                });
            } else {
                // Crear
                res = await fetch('/api/productos', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(productoData)
                });
            }

            const result = await res.json();
            if (res.ok) {
                mensajeDiv.textContent = result.mensaje;
                mensajeDiv.style.color = 'green';
                limpiarFormulario();
                cargarProductos();
            } else {
                mensajeDiv.textContent = result.mensaje;
                mensajeDiv.style.color = 'red';
            }
        } catch (error) {
            mensajeDiv.textContent = 'Error en el servidor.';
            mensajeDiv.style.color = 'red';
        }
    });

    // Cancelar edición
    btnCancelar.addEventListener('click', limpiarFormulario);

    // Delegación para botones editar y borrar
    tablaCuerpo.addEventListener('click', async e => {
        if (e.target.classList.contains('editar')) {
            const id = e.target.dataset.id;
            try {
                const res = await fetch('/api/productos');
                const productos = await res.json();
                const producto = productos.find(p => p.id == id);
                if (producto) {
                    llenarFormulario(producto);
                }
            } catch {
                mensajeDiv.textContent = 'Error al cargar producto.';
                mensajeDiv.style.color = 'red';
            }
        }

        if (e.target.classList.contains('borrar')) {
            const id = e.target.dataset.id;
            const usuario = prompt('Ingrese su nombre de usuario admin para confirmar eliminación:');
            if (!usuario) return;

            if (confirm('¿Seguro desea eliminar este producto?')) {
                try {
                    const res = await fetch(`/api/productos/${id}?usuario=${usuario}`, {
                        method: 'DELETE',
                    });
                    const result = await res.json();
                    if (res.ok) {
                        mensajeDiv.textContent = result.mensaje;
                        mensajeDiv.style.color = 'green';
                        cargarProductos();
                    } else {
                        mensajeDiv.textContent = result.mensaje;
                        mensajeDiv.style.color = 'red';
                    }
                } catch {
                    mensajeDiv.textContent = 'Error en el servidor.';
                    mensajeDiv.style.color = 'red';
                }
            }
        }
    });
});
