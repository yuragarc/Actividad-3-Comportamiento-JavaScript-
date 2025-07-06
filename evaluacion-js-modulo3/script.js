// Esperamos a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referenciamos los elementos del DOM que vamos a utilizar
    const nombreInput = document.getElementById('nombreInput');
    const btnSaludar = document.getElementById('btnSaludar');
    const saludoElement = document.getElementById('saludo');
    const caracteresElement = document.getElementById('caracteres');

    // Función para generar el saludo personalizado
    function generarSaludo() {
        // Obtenemos el valor del input y eliminamos espacios al inicio y final
        const nombre = nombreInput.value.trim();
        
        // Comprobamos si el usuario ha ingresado un nombre
        if (nombre === '') {
            // Si está vacío, mostramos un mensaje de error
            saludoElement.textContent = 'Por favor, introduce un nombre o palabra';
            saludoElement.style.color = '#dc3545'; // Rojo para error
            caracteresElement.textContent = '';
        } else {
            // Si hay un nombre o palabra, generamos el saludo
            saludoElement.textContent = `¡Hola, ${nombre}!`;
            saludoElement.style.color = '#007bff'; // Color normal
            // Mostramos el número de caracteres
            caracteresElement.textContent = `Tu nombre o palabra tiene ${nombre.length} caracteres.`;
        }
    }

    // Asignamos el evento click al botón
    btnSaludar.addEventListener('click', generarSaludo);

    // Permitir usar Enter en el campo de texto
    nombreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generarSaludo();
        }
    });
});
