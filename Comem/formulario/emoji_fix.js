// Solución alternativa para problemas de emojis en WhatsApp
// Este archivo contiene diferentes opciones para manejar los emojis

// Opción 1: Emojis más compatibles (recomendado)
const emojiCompatible = {
    building: '🏢',  // U+1F3E2
    person: '👤',    // U+1F464  
    phone: '📱',     // U+1F4F1 (teléfono móvil es más compatible)
    factory: '🏭',   // U+1F3ED
    mail: '✉️',      // U+2709 (sobre es más compatible)
    clipboard: '📝', // U+1F4DD (memo es más compatible)
    clock: '🕐'      // U+1F550 (reloj 1 en punto es más compatible)
};

// Opción 2: Solo usar emojis básicos muy compatibles
const emojiBasico = {
    building: '⭐',  // Estrella
    person: '👍',    // Pulgar arriba
    phone: '☎️',     // Teléfono básico
    factory: '⚡',   // Rayo
    mail: '📧',      // Email
    clipboard: '📄', // Documento
    clock: '⏰'      // Despertador
};

// Opción 3: Sin emojis, solo texto con símbolos
const sinEmoji = {
    building: '>> ',
    person: '• ',
    phone: '☎ ',
    factory: '• ',
    mail: '@ ',
    clipboard: '→ ',
    clock: '📅 '
};

// Función para detectar el tipo de dispositivo/navegador
function detectarPlataforma() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isWindows = userAgent.includes('windows');
    const isChrome = userAgent.includes('chrome');
    const isFirefox = userAgent.includes('firefox');
    const isEdge = userAgent.includes('edge');
    
    return {
        isWindows,
        isChrome,
        isFirefox,
        isEdge,
        // Los emojis funcionan mejor en Chrome y Edge que en Firefox en Windows
        recomendarEmoji: !isWindows || (isWindows && (isChrome || isEdge))
    };
}

// Función para obtener el conjunto de emojis apropiado
function obtenerEmojis() {
    const plataforma = detectarPlataforma();
    
    if (!plataforma.recomendarEmoji) {
        return sinEmoji;
    }
    
    return emojiCompatible;
}

// Función mejorada para codificar mensajes de WhatsApp
function codificarMensajeWhatsApp(mensaje) {
    try {
        // Normalizar el texto Unicode
        const normalizado = mensaje.normalize('NFC');
        
        // Codificar para URL
        let codificado = encodeURIComponent(normalizado);
        
        // Reemplazos específicos para WhatsApp
        codificado = codificado.replace(/'/g, '%27');
        codificado = codificado.replace(/"/g, '%22');
        codificado = codificado.replace(/&/g, '%26');
        
        return codificado;
    } catch (error) {
        console.error('Error codificando mensaje:', error);
        // Fallback: codificación básica
        return encodeURIComponent(mensaje);
    }
}

// Exportar las funciones para uso en el HTML principal
window.EmojiHelper = {
    obtenerEmojis,
    codificarMensajeWhatsApp,
    detectarPlataforma,
    emojiCompatible,
    emojiBasico,
    sinEmoji
};