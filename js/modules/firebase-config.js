// Configuración de Firebase para Sensus
// IMPORTANTE: Reemplaza estos valores con tu configuración real de Firebase

const firebaseConfig = {
    // CONFIGURACIÓN REAL DE FIREBASE - Valores de tu proyecto
    apiKey: "AIzaSyBKZiEz_291NXNQpAsuGq8qz0MSUQw41Fw",
    authDomain: "sensus-version-pro.firebaseapp.com",
    projectId: "sensus-version-pro",
    storageBucket: "sensus-version-pro.firebasestorage.app",
    messagingSenderId: "887018721709",
    appId: "1:887018721709:web:fbf4bfa3dc89517f9b9124",
    measurementId: "G-L9YHW52ZSK"
};

// Función para inicializar Firebase
function initializeFirebase() {
    // Verificar si Firebase está disponible
    if (typeof firebase === 'undefined') {
        console.error('Firebase no está cargado. Verifica que los scripts de Firebase estén incluidos.');
        return false;
    }
    
    // Verificar si ya está inicializado
    if (firebase.apps.length > 0) {
        console.log('Firebase ya está inicializado');
        return true;
    }
    
    try {
        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Inicializar Analytics
        if (firebase.analytics) {
            firebase.analytics();
        }
        
        console.log('Firebase inicializado correctamente');
        return true;
    } catch (error) {
        console.error('Error al inicializar Firebase:', error);
        return false;
    }
}

// Inicializar Firebase cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que Firebase esté cargado
    setTimeout(initializeFirebase, 100);
});

// También intentar inicializar inmediatamente si Firebase ya está disponible
if (typeof firebase !== 'undefined') {
    initializeFirebase();
}
