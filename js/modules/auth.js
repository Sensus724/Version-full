// Sensus - Módulo de autenticación con Firebase

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Firebase Auth
    initFirebaseAuth();
});

// Inicializar Firebase Auth
function initFirebaseAuth() {
    // Verificar si Firebase está disponible
    if (typeof firebase === 'undefined') {
        console.error('Firebase no está disponible. Verifica la conexión a los scripts de Firebase.');
        return;
    }
    
    // Referencias a elementos del DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authModal = document.getElementById('auth-modal');
    
    // Verificar si el usuario ya está autenticado
    firebase.auth().onAuthStateChanged(function(user) {
        updateUIForAuthState(user);
    });
    
    // Evento de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validar campos
            if (!email || !password) {
                showAuthError('Por favor, completa todos los campos.');
                return;
            }
            
            // Iniciar sesión con Firebase
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(userCredential) {
                    // Inicio de sesión exitoso
                    closeAuthModal();
                    showAuthSuccess('¡Inicio de sesión exitoso!');
                })
                .catch(function(error) {
                    // Error en el inicio de sesión
                    handleAuthError(error);
                });
        });
    }
    
    // Evento de registro
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Validar campos
            if (!name || !email || !password || !confirmPassword) {
                showAuthError('Por favor, completa todos los campos.');
                return;
            }
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                showAuthError('Las contraseñas no coinciden.');
                return;
            }
            
            // Validar longitud de contraseña
            if (password.length < 6) {
                showAuthError('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            
            // Crear cuenta con Firebase
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(userCredential) {
                    // Actualizar perfil del usuario
                    return userCredential.user.updateProfile({
                        displayName: name
                    });
                })
                .then(function() {
                    // Registro exitoso
                    closeAuthModal();
                    showAuthSuccess('¡Cuenta creada exitosamente!');
                })
                .catch(function(error) {
                    // Error en el registro
                    handleAuthError(error);
                });
        });
    }
    
    // Evento de inicio de sesión con Google
    const googleButtons = document.querySelectorAll('.btn-google');
    googleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = new firebase.auth.GoogleAuthProvider();
            
            firebase.auth().signInWithPopup(provider)
                .then(function() {
                    // Inicio de sesión con Google exitoso
                    closeAuthModal();
                    showAuthSuccess('¡Inicio de sesión con Google exitoso!');
                })
                .catch(function(error) {
                    // Error en el inicio de sesión con Google
                    handleAuthError(error);
                });
        });
    });
    
    // Evento de recuperación de contraseña
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('login-email').value;
            
            if (!email) {
                showAuthError('Por favor, ingresa tu correo electrónico para recuperar tu contraseña.');
                return;
            }
            
            firebase.auth().sendPasswordResetEmail(email)
                .then(function() {
                    showAuthSuccess('Se ha enviado un correo para restablecer tu contraseña.');
                })
                .catch(function(error) {
                    handleAuthError(error);
                });
        });
    }
}

// Actualizar UI según el estado de autenticación
function updateUIForAuthState(user) {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    
    if (!loginBtn || !registerBtn) return;
    
    if (user) {
        // Usuario autenticado
        loginBtn.textContent = 'Mi cuenta';
        loginBtn.onclick = function() {
            window.location.href = 'perfil.html';
        };
        
        registerBtn.textContent = 'Cerrar sesión';
        registerBtn.onclick = function() {
            firebase.auth().signOut()
                .then(function() {
                    showAuthSuccess('Sesión cerrada correctamente.');
                    updateUIForAuthState(null);
                })
                .catch(function(error) {
                    console.error('Error al cerrar sesión:', error);
                });
        };
    } else {
        // Usuario no autenticado
        loginBtn.textContent = 'Iniciar sesión';
        loginBtn.onclick = function() {
            const authModal = document.getElementById('auth-modal');
            if (authModal) {
                authModal.classList.add('active');
                showAuthTab('login');
            }
        };
        
        registerBtn.textContent = 'Registrarse';
        registerBtn.onclick = function() {
            const authModal = document.getElementById('auth-modal');
            if (authModal) {
                authModal.classList.add('active');
                showAuthTab('register');
            }
        };
    }
}

// Cerrar modal de autenticación
function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.classList.remove('active');
    }
}

// Mostrar mensaje de error de autenticación
function showAuthError(message) {
    alert(`Error: ${message}`);
    // En una implementación real, se mostraría un mensaje más elegante
}

// Mostrar mensaje de éxito de autenticación
function showAuthSuccess(message) {
    alert(message);
    // En una implementación real, se mostraría un mensaje más elegante
}

// Manejar errores de Firebase Auth
function handleAuthError(error) {
    console.error('Error de autenticación:', error);
    
    let errorMessage = 'Ha ocurrido un error. Por favor, inténtalo de nuevo.';
    
    // Mensajes personalizados para errores comunes
    switch (error.code) {
        case 'auth/user-not-found':
            errorMessage = 'No existe una cuenta con este correo electrónico.';
            break;
        case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta.';
            break;
        case 'auth/email-already-in-use':
            errorMessage = 'Este correo electrónico ya está registrado.';
            break;
        case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico no es válido.';
            break;
        case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil.';
            break;
        case 'auth/network-request-failed':
            errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
            break;
    }
    
    showAuthError(errorMessage);
}