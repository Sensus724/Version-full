// Sensus - Script principal

// Ocultar el loader cuando la página esté completamente cargada
window.addEventListener('load', function() {
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(function() {
            pageLoader.classList.add('hidden');
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initThemeToggle();
    initMobileMenu();
    initAuthModal();
    initFAQAccordion();
    initTestForm();
    initDiaryForm();
    initTestimonialSlider();
    initAnimations();
    
    // Detectar la página actual y ejecutar funciones específicas
    const currentPage = getCurrentPage();
    console.log('Página actual:', currentPage);
    
    // Marcar el enlace de navegación activo
    highlightActiveNavLink(currentPage);
});

// Obtener la página actual basada en la URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    if (!page || page === '' || page === 'index.html') {
        return 'index';
    }
    
    return page.replace('.html', '');
}

// Resaltar el enlace de navegación activo
function highlightActiveNavLink(currentPage) {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPage = link.getAttribute('href').replace('.html', '');
        if (linkPage === currentPage || (linkPage === 'index' && currentPage === '')) {
            link.classList.add('active');
        }
    });
}

// Inicializar animaciones
function initAnimations() {
    // Añadir efecto hover a los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    // Añadir efecto de animación a los elementos del menú
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${0.1 * index}s`;
        item.style.animation = 'fadeInDown 0.5s forwards';
    });
    
    // Añadir efecto de animación a las tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + (0.1 * index)}s`;
        card.style.animation = 'fadeIn 0.8s forwards';
    });
}

// Inicializar el toggle de tema claro/oscuro
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Inicializar menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animar las barras del menú hamburguesa
        const bars = menuToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
    
    // Cerrar menú al hacer clic en un enlace
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });
}

// Inicializar modal de autenticación
function initAuthModal() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    
    if (!authModal) return;
    
    // Abrir modal con tab de login
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            authModal.classList.add('active');
            showAuthTab('login');
        });
    }
    
    // Abrir modal con tab de registro
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            authModal.classList.add('active');
            showAuthTab('register');
        });
    }
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            authModal.classList.remove('active');
        });
    }
    
    // Cambiar entre tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showAuthTab(tabName);
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.classList.remove('active');
        }
    });
    
    // Prevenir envío de formularios (para demo)
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Funcionalidad de autenticación en desarrollo.');
        });
    });
}

// Mostrar tab específico en el modal de autenticación
function showAuthTab(tabName) {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Desactivar todos los tabs y formularios
    authTabs.forEach(tab => tab.classList.remove('active'));
    authForms.forEach(form => form.classList.remove('active'));
    
    // Activar el tab y formulario seleccionado
    document.querySelector(`.auth-tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-form`).classList.add('active');
}

// Inicializar acordeón de preguntas frecuentes
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar estado del item actual
            item.classList.toggle('active');
        });
    });
}

// Inicializar formulario de test GAD-7
function initTestForm() {
    const testForm = document.querySelector('.test-form');
    
    if (!testForm) return;
    
    testForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Calcular puntuación
        let score = 0;
        const questions = testForm.querySelectorAll('.test-question');
        
        questions.forEach(question => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            
            if (selectedOption) {
                score += parseInt(selectedOption.value);
            }
        });
        
        // Mostrar resultado
        showTestResult(score);
    });
}

// Mostrar resultado del test GAD-7
function showTestResult(score) {
    const resultElement = document.querySelector('.test-result');
    
    if (!resultElement) return;
    
    // Eliminar clases previas
    resultElement.classList.remove('result-mild', 'result-moderate', 'result-severe');
    
    // Determinar nivel de ansiedad
    let anxietyLevel, resultClass, recommendation;
    
    if (score >= 0 && score <= 4) {
        anxietyLevel = 'Mínima';
        resultClass = 'result-mild';
        recommendation = 'Tu nivel de ansiedad es mínimo. Continúa monitoreando tus emociones y practica técnicas de autocuidado regularmente.';
    } else if (score >= 5 && score <= 9) {
        anxietyLevel = 'Leve';
        resultClass = 'result-mild';
        recommendation = 'Presentas síntomas de ansiedad leve. Te recomendamos implementar técnicas de relajación y mindfulness en tu rutina diaria.';
    } else if (score >= 10 && score <= 14) {
        anxietyLevel = 'Moderada';
        resultClass = 'result-moderate';
        recommendation = 'Presentas síntomas de ansiedad moderada. Considera consultar con un profesional de la salud mental para recibir orientación adicional.';
    } else {
        anxietyLevel = 'Severa';
        resultClass = 'result-severe';
        recommendation = 'Presentas síntomas de ansiedad severa. Te recomendamos buscar ayuda profesional lo antes posible para recibir el apoyo adecuado.';
    }
    
    // Actualizar contenido
    resultElement.innerHTML = `
        <h3>Resultado: Ansiedad ${anxietyLevel}</h3>
        <p>Puntuación: ${score} / 21</p>
        <p>${recommendation}</p>
        <div class="result-actions">
            <button class="btn btn-primary" id="save-result">Guardar resultado</button>
            <button class="btn btn-outline" id="retake-test">Realizar test nuevamente</button>
        </div>
    `;
    
    // Añadir clase correspondiente
    resultElement.classList.add(resultClass);
    
    // Mostrar resultado
    resultElement.style.display = 'block';
    
    // Scroll al resultado
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Evento para guardar resultado (demo)
    const saveButton = document.getElementById('save-result');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            alert('Resultado guardado correctamente.');
        });
    }
    
    // Evento para reiniciar test
    const retakeButton = document.getElementById('retake-test');
    if (retakeButton) {
        retakeButton.addEventListener('click', function() {
            testForm.reset();
            resultElement.style.display = 'none';
            window.scrollTo({ top: testForm.offsetTop, behavior: 'smooth' });
        });
    }
}

// Inicializar formulario del diario emocional
function initDiaryForm() {
    const diaryForm = document.querySelector('.diary-form');
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    if (!diaryForm || !moodButtons.length) return;
    
    // Selección de estado de ánimo
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Deseleccionar todos los botones
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Seleccionar el botón actual
            this.classList.add('selected');
            
            // Actualizar campo oculto
            const moodInput = document.getElementById('mood-input');
            if (moodInput) {
                moodInput.value = this.getAttribute('data-mood');
            }
        });
    });
    
    // Envío del formulario
    diaryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const moodInput = document.getElementById('mood-input');
        const entryText = document.getElementById('entry-text');
        
        if (!moodInput || !entryText) return;
        
        // Validar que se haya seleccionado un estado de ánimo
        if (!moodInput.value) {
            alert('Por favor, selecciona cómo te sientes hoy.');
            return;
        }
        
        // Validar que se haya escrito una entrada
        if (!entryText.value.trim()) {
            alert('Por favor, escribe algo en tu entrada del diario.');
            return;
        }
        
        // Simular guardado (para demo)
        saveDiaryEntry(moodInput.value, entryText.value);
        
        // Reiniciar formulario
        diaryForm.reset();
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Mostrar mensaje de éxito
        alert('Entrada guardada correctamente. ¡Continúa con tu racha!');
        
        // Actualizar lista de entradas (en una implementación real)
        // updateDiaryEntries();
    });
}

// Simular guardado de entrada del diario
function saveDiaryEntry(mood, text) {
    console.log('Guardando entrada:', { mood, text, date: new Date() });
    // En una implementación real, aquí se guardaría en Firebase
}

// Inicializar slider de testimonios
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (!testimonials.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    
    // Mostrar solo el testimonio actual
    function updateSlider() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === currentIndex ? 'block' : 'none';
        });
    }
    
    // Inicializar
    updateSlider();
    
    // Evento para testimonio anterior
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    });
    
    // Evento para testimonio siguiente
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    });
    
    // Cambio automático cada 5 segundos
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }, 5000);
}

// Animación de elementos al hacer scroll
document.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('animated');
        }
    });
});