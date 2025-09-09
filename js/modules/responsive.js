// Sensus - Módulo de responsividad

document.addEventListener('DOMContentLoaded', function() {
    initResponsiveModule();
});

function initResponsiveModule() {
    // Detectar tipo de dispositivo
    detectDevice();
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Inicializar comportamiento de scroll
    initScrollBehavior();
    
    // Ajustar elementos según el tamaño de pantalla
    adjustElementsForScreenSize();
    
    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', function() {
        detectDevice();
        adjustElementsForScreenSize();
    });
}

// Detectar tipo de dispositivo
function detectDevice() {
    const html = document.documentElement;
    
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Detectar si es pantalla táctil
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    
    // Detectar tamaño de pantalla
    const isSmallScreen = window.innerWidth < 768;
    const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isLargeScreen = window.innerWidth >= 1024;
    
    // Establecer clases en el elemento HTML
    html.classList.remove('is-mobile', 'is-desktop', 'is-touch', 'is-no-touch', 'is-small-screen', 'is-medium-screen', 'is-large-screen');
    
    html.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
    html.classList.add(isTouchDevice ? 'is-touch' : 'is-no-touch');
    
    if (isSmallScreen) {
        html.classList.add('is-small-screen');
    } else if (isMediumScreen) {
        html.classList.add('is-medium-screen');
    } else {
        html.classList.add('is-large-screen');
    }
}

// Inicializar menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = navLinks ? navLinks.querySelectorAll('li') : [];
    
    if (!menuToggle || !navLinks) return;
    
    // Añadir índices a los elementos del menú para animación escalonada
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    menuToggle.addEventListener('click', function() {
        // Alternar clase activa en el botón
        this.classList.toggle('active');
        
        // Alternar clase activa en los enlaces de navegación
        navLinks.classList.toggle('active');
        
        // Alternar atributo aria-expanded
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        
        // Aplicar animación a los elementos del menú
        if (navLinks.classList.contains('active')) {
            navItems.forEach((item, index) => {
                item.style.animationDelay = `${0.1 * index}s`;
                item.style.animation = 'menuFadeIn 0.5s forwards';
            });
        } else {
            navItems.forEach(item => {
                item.style.animation = 'none';
            });
        }
    });
    
    // Añadir efecto hover a los elementos del menú
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.3s ease';
            });
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            // Solo cerrar en pantallas pequeñas
            if (window.innerWidth < 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnMenuToggle && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Inicializar comportamiento de scroll
function initScrollBehavior() {
    // Obtener el header
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    // Posición de scroll anterior
    let lastScrollTop = 0;
    
    // Escuchar evento de scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determinar dirección del scroll
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scroll hacia abajo
            header.classList.add('header-hidden');
        } else {
            // Scroll hacia arriba
            header.classList.remove('header-hidden');
        }
        
        // Agregar sombra al hacer scroll
        if (scrollTop > 10) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Botón de volver arriba
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar botón según la posición de scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Evento de clic en el botón
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Añadir clase fade-in a elementos que queremos animar
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .section-title, .hero-content');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Función para comprobar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Función para manejar el scroll y mostrar elementos
    function handleScroll() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Ejecutar una vez para elementos visibles inicialmente
    handleScroll();
    
    // Añadir evento de scroll
    window.addEventListener('scroll', handleScroll);
}

// Ajustar elementos según el tamaño de pantalla
function adjustElementsForScreenSize() {
    // Ajustar altura de elementos hero
    const heroSections = document.querySelectorAll('.hero-section');
    heroSections.forEach(section => {
        if (window.innerWidth < 768) {
            // En móviles, altura más pequeña
            section.style.minHeight = '70vh';
        } else {
            // En escritorio, altura completa
            section.style.minHeight = '80vh';
        }
    });
    
    // Ajustar disposición de tarjetas
    const cardGrids = document.querySelectorAll('.card-grid');
    cardGrids.forEach(grid => {
        if (window.innerWidth < 768) {
            grid.classList.add('card-grid-mobile');
        } else {
            grid.classList.remove('card-grid-mobile');
        }
    });
    
    // Ajustar tamaño de fuente para títulos en móviles
    const mainHeadings = document.querySelectorAll('h1, h2');
    mainHeadings.forEach(heading => {
        if (window.innerWidth < 768) {
            heading.classList.add('mobile-heading');
        } else {
            heading.classList.remove('mobile-heading');
        }
    });
}