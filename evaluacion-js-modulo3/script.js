document.getElementById('saludoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreInput = document.getElementById('nombreInput');
    const nombre = nombreInput.value.trim();

    const saludoElem = document.getElementById('saludo');
    const caracteresElem = document.getElementById('caracteres');

    // Validar entrada
    if (nombre.length > 0) {
        saludoElem.textContent = `¡Hola, ${nombre}!`;
        caracteresElem.textContent = `Tu nombre contiene ${nombre.length} caracteres.`;
    } else {
        saludoElem.textContent = '';
        caracteresElem.textContent = 'Por favor, escribe tu nombre arriba.';
    }

    // Limpiar el campo (opcional)
    // nombreInput.value = "";
});
