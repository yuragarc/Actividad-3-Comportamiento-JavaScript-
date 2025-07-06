/**
 * Script JavaScript para el Generador de Saludos
 * Contiene toda la lógica de interacción y validación
 */

// Variables globales para almacenar referencias a elementos del DOM
let inputNombre;
let btnSaludar;
let saludoContainer;
let saludoElement;
let caracteresContainer;
let caracteresElement;

/**
 * Función de inicialización que se ejecuta cuando el DOM está listo
 * Configura las referencias a elementos y eventos
 */
function inicializarApp() {
    // Obtener referencias a elementos del DOM
    inputNombre = document.getElementById('nombre');
    btnSaludar = document.getElementById('btnSaludar');
    saludoContainer = document.getElementById('saludoContainer');
    saludoElement = document.getElementById('saludo');
    caracteresContainer = document.getElementById('caracteresContainer');
    caracteresElement = document.getElementById('infoCaracteres');

    // Configurar eventos
    configurarEventos();

    // Enfocar el input al cargar la página
    inputNombre.focus();
}

/**
 * Función para configurar todos los eventos de la aplicación
 */
function configurarEventos() {
    // Evento click del botón
    btnSaludar.addEventListener('click', manejarSaludo);

    // Evento keydown para detectar Enter en el input
    inputNombre.addEventListener('keydown', manejarTeclaPresionada);

    // Evento input para limpiar mensajes cuando el usuario empiece a escribir
    inputNombre.addEventListener('input', manejarCambioTexto);

    // Evento focus para mejorar la experiencia del usuario
    inputNombre.addEventListener('focus', manejarFoco);
}

/**
 * Función principal para manejar el evento de saludo
 * Valida el input y genera el saludo correspondiente
 */
function manejarSaludo() {
    // Obtener y limpiar el valor del input
    const nombreIngresado = inputNombre.value.trim();

    // Añadir efecto de carga temporal
    mostrarCargando(true);

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
        // Estructura condicional para validar el nombre
        if (nombreIngresado === '') {
            // Caso: nombre vacío
            mostrarMensajeError();
        } else if (nombreIngresado.length < 2) {
            // Caso: nombre muy corto
            mostrarMensajeNombreCorto();
        } else if (nombreIngresado.length > 50) {
            // Caso: nombre muy largo
            mostrarMensajeNombreLargo();
        } else {
            // Caso: nombre válido
            mostrarSaludoExitoso(nombreIngresado);
        }

        // Quitar efecto de carga
        mostrarCargando(false);
    }, 300);
}

/**
 * Función para mostrar mensaje de error cuando el nombre está vacío
 */
function mostrarMensajeError() {
    actualizarSaludo('⚠️ Por favor, ingresa tu nombre para continuar.');
    actualizarCaracteres('El campo está vacío. Ingresa tu nombre.');
    aplicarEstiloError();
}

/**
 * Función para mostrar mensaje cuando el nombre es muy corto
 */
function mostrarMensajeNombreCorto() {
    actualizarSaludo('🤔 Tu nombre parece muy corto. ¿Podrías escribirlo completo?');
    actualizarCaracteres('El nombre debe tener al menos 2 caracteres.');
    aplicarEstiloAdvertencia();
}

/**
 * Función para mostrar mensaje cuando el nombre es muy largo
 */
function mostrarMensajeNombreLargo() {
    actualizarSaludo('😅 ¡Vaya! Tu nombre es muy largo. Intenta con una versión más corta.');
    actualizarCaracteres('El nombre no puede tener más de 50 caracteres.');
    aplicarEstiloAdvertencia();
}

/**
 * Función para mostrar el saludo exitoso
 * @param {string} nombre - El nombre válido ingresado por el usuario
 */
function mostrarSaludoExitoso(nombre) {
    // Generar saludo personalizado
    const saludoPersonalizado = generarSaludoPersonalizado(nombre);
    actualizarSaludo(saludoPersonalizado);

    // Contar caracteres y generar mensaje
    const cantidadCaracteres = nombre.length;
    const mensajeCaracteres = `Tu nombre tiene ${cantidadCaracteres} caractere${cantidadCaracteres !== 1 ? 's' : ''}. ${obtenerComentarioCaracteres(cantidadCaracteres)}`;
    actualizarCaracteres(mensajeCaracteres);

    aplicarEstiloExito();
}

/**
 * Función para generar un saludo personalizado con variaciones
 * @param {string} nombre - El nombre del usuario
 * @returns {string} - El saludo personalizado
 */
function generarSaludoPersonalizado(nombre) {
    const saludos = [
        `¡Hola, ${nombre}! 👋`,
        `¡Bienvenido/a, ${nombre}! 🎉`,
        `¡Qué gusto saludarte, ${nombre}! 😊`,
        `¡Hola ${nombre}, espero que tengas un gran día! ☀️`,
        `¡Saludos, ${nombre}! 🌟`
    ];

    // Seleccionar un saludo aleatorio
    const indiceAleatorio = Math.floor(Math.random() * saludos.length);
    return saludos[indiceAleatorio];
}

/**
 * Función para obtener un comentario adicional basado en la cantidad de caracteres
 * @param {number} cantidad - Número de caracteres del nombre
 * @returns {string} - Comentario adicional
 */
function obtenerComentarioCaracteres(cantidad) {
    if (cantidad <= 4) {
        return '¡Qué nombre tan conciso! 📝';
    } else if (cantidad <= 8) {
        return '¡Perfecto! 👌';
    } else if (cantidad <= 15) {
        return '¡Un nombre con personalidad! ✨';
    } else {
        return '¡Qué nombre tan distinguido! 🎭';
    }
}

/**
 * Función para manejar el evento de tecla presionada
 * @param {KeyboardEvent} event - Evento de teclado
 */
function manejarTeclaPresionada(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        manejarSaludo();
    }
}

/**
 * Función para manejar cambios en el texto del input
 */
function manejarCambioTexto() {
    // Limpiar estilos de error si el usuario empieza a escribir
    if (inputNombre.value.trim().length > 0) {
        limpiarEstilosError();
    }
}

/**
 * Función para manejar el evento de foco en el input
 */
function manejarFoco() {
    // Remover clases de error al enfocar
    limpiarEstilosError();
}

/**
 * Función para actualizar el contenido del saludo
 * @param {string} mensaje - Mensaje a mostrar
 */
function actualizarSaludo(mensaje) {
    saludoElement.textContent = mensaje;
    saludoContainer.style.display = 'block';
}

/**
 * Función para actualizar el contenido de información de caracteres
 * @param {string} mensaje - Mensaje a mostrar
 */
function actualizarCaracteres(mensaje) {
    caracteresElement.textContent = mensaje;
    caracteresContainer.style.display = 'block';
}

/**
 * Función para aplicar estilos de error
 */
function aplicarEstiloError() {
    inputNombre.style.borderColor = '#f56565';
    inputNombre.style.boxShadow = '0 0 0 3px rgba(245, 101, 101, 0.1)';
    saludoContainer.style.backgroundColor = '#fed7d7';
    saludoContainer.style.borderColor = '#fc8181';
    saludoElement.style.color = '#c53030';
}

/**
 * Función para aplicar estilos de advertencia
 */
function aplicarEstiloAdvertencia() {
    inputNombre.style.borderColor = '#ed8936';
    inputNombre.style.boxShadow = '0 0 0 3px rgba(237, 137, 54, 0.1)';
    saludoContainer.style.backgroundColor = '#fef5e7';
    saludoContainer.style.borderColor = '#f6ad55';
    saludoElement.style.color = '#dd6b20';
}

/**
 * Función para aplicar estilos de éxito
 */
function aplicarEstiloExito() {
    inputNombre.style.borderColor = '#48bb78';
    inputNombre.style.boxShadow = '0 0 0 3px rgba(72, 187, 120, 0.1)';
    saludoContainer.style.backgroundColor = '#f0fff4';
    saludoContainer.style.borderColor = '#c6f6d5';
    saludoElement.style.color = '#22543d';
}

/**
 * Función para limpiar estilos de error y advertencia
 */
function limpiarEstilosError() {
    inputNombre.style.borderColor = '#e2e8f0';
    inputNombre.style.boxShadow = 'none';
}

/**
 * Función para mostrar/ocultar el efecto de carga
 * @param {boolean} mostrar - Si se debe mostrar el efecto de carga
 */
function mostrarCargando(mostrar) {
    if (mostrar) {
        btnSaludar.disabled = true;
        btnSaludar.classList.add('loading');
        btnSaludar.textContent = '';
    } else {
        btnSaludar.disabled = false;
        btnSaludar.classList.remove('loading');
        btnSaludar.textContent = 'Saludar';
    }
}

/**
 * Función para limpiar todos los mensajes mostrados
 */
function limpiarMensajes() {
    saludoContainer.style.display = 'none';
    caracteresContainer.style.display = 'none';
    limpiarEstilosError();
}

/**
 * Función para resetear la aplicación
 */
function resetearApp() {
    inputNombre.value = '';
    limpiarMensajes();
    inputNombre.focus();
}

// Event listener para ejecutar la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);

// Opcional: Función global para resetear (puede ser útil para testing)
window.resetearGeneradorSaludos = resetearApp;
