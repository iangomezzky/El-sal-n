document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('turno-form');
    const listaTurnos = document.getElementById('lista-turnos');
    const clienteInput = document.getElementById('cliente');
    const fechaInput = document.getElementById('fecha');
    const servicioInput = document.getElementById('servicio');
    const telefonoInput = document.getElementById('telefono');
  
    // --- Validadores ---
    function esNombreValido(nombre) {
      return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre.trim());
    }
  
    function esTelefonoValido(telefono) {
      return telefono.trim() === '' || /^\d{7,15}$/.test(telefono);
    }
  
    function mostrarError(input, mensaje) {
      input.style.borderColor = 'red';
      alert(mensaje);
    }
  
    function limpiarErrores() {
      [clienteInput, telefonoInput].forEach(input => input.style.borderColor = '#e79cb8');
    }
  
    // --- Agregado de turno ---
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      limpiarErrores();
  
      const nombre = clienteInput.value.trim();
      const fecha = new Date(fechaInput.value);
      const servicio = servicioInput.value;
      const telefono = telefonoInput.value.trim();
  
      // Validaciones
      if (!esNombreValido(nombre)) {
        mostrarError(clienteInput, 'Por favor ingresá un nombre válido (solo letras y espacios).');
        return;
      }
  
      if (!esTelefonoValido(telefono)) {
        mostrarError(telefonoInput, 'Por favor ingresá un número válido (solo números entre 7 y 15 dígitos).');
        return;
      }
  
      const turnoItem = document.createElement('li');
      turnoItem.innerHTML = `
        <strong>${nombre}</strong> - ${fecha.toLocaleString('es-AR')} - <em>${servicio}</em>
        ${telefono ? `<br>📞 ${telefono}` : ''}
        <button onclick="this.parentElement.remove()">❌</button>
      `;
      listaTurnos.appendChild(turnoItem);
  
      form.reset();
    });
  
    // --- Fecha mínima y máxima (hoy hasta 3 semanas) ---
    const hoy = new Date();
    const maxFecha = new Date();
    maxFecha.setDate(hoy.getDate() + 21);
  
    fechaInput.min = hoy.toISOString().split("T")[0] + "T08:00";
    fechaInput.max = maxFecha.toISOString().split("T")[0] + "T20:00";
  
    // --- Restringir horario a jornada laboral (8 a 20 hs) ---
    fechaInput.addEventListener('change', () => {
      const hora = new Date(fechaInput.value).getHours();
      if (hora < 8 || hora > 20) {
        alert('Solo se permiten turnos entre las 08:00 y las 20:00 hs.');
        fechaInput.value = '';
      }
    });
  });
  