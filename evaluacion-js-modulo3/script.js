document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.getElementById('nombreInput');
    const btnSaludar = document.getElementById('btnSaludar');
    const saludoElement = document.getElementById('saludo');
    const caracteresElement = document.getElementById('caracteres');

    function generarSaludo() {
        const nombre = nombreInput.value.trim();
        if (nombre === '') {
            saludoElement.textContent = 'Por favor, introduce un nombre o palabra';
            saludoElement.style.color = '#dc3545';
            caracteresElement.textContent = '';
        } else {
            saludoElement.textContent = `¡Hola, ${nombre}!`;
            saludoElement.style.color = '#007bff';
            caracteresElement.textContent = `Tu nombre o palabra tiene ${nombre.length} caracteres.`;
        }
    }

    btnSaludar.addEventListener('click', generarSaludo);
    nombreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generarSaludo();
        }
    });
});
