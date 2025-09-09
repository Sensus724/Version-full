# Sensus - Aplicación Web para el Manejo de la Ansiedad

## Descripción

Sensus es una aplicación web responsiva diseñada para ayudar a las personas a gestionar su ansiedad a través de herramientas como el test GAD-7 validado clínicamente, un diario emocional con sistema de racha, y recursos informativos sobre la ansiedad.

## Características Principales

- **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles, tablets y escritorio
- **Test GAD-7**: Evaluación clínicamente validada para medir niveles de ansiedad
- **Diario Emocional**: Seguimiento diario de emociones con sistema de racha
- **Autenticación**: Sistema completo de registro e inicio de sesión con Firebase
- **Información sobre Ansiedad**: Recursos educativos sobre síntomas y tipos de ansiedad
- **Planes de Suscripción**: Diferentes niveles de acceso a funcionalidades

## Tecnologías Utilizadas

- HTML5, CSS3, JavaScript (ES6+)
- Firebase (Autenticación, Firestore)
- Diseño responsivo con Media Queries
- Iconos de Font Awesome
- Fuentes de Google Fonts

## Estructura del Proyecto

```
├── index.html              # Página principal
├── como-funciona.html      # Explicación del funcionamiento
├── test.html               # Test GAD-7
├── diario.html             # Diario emocional
├── ansiedad.html           # Información sobre ansiedad
├── planes.html             # Planes de suscripción
├── contacto.html           # Página de contacto
├── equipo.html             # Información sobre el equipo
├── styles.css              # Estilos CSS
├── script.js               # JavaScript principal
├── modules/                # Módulos JavaScript
│   ├── auth.js             # Autenticación
│   ├── test.js             # Funcionalidad del test
│   └── diario.js           # Funcionalidad del diario
├── logo.svg                # Logo principal
├── placeholder-logo.svg    # Logo de respaldo
└── favicon.ico             # Favicon
```

## Requisitos para el Despliegue

1. Cuenta en Firebase para configurar autenticación y base de datos
2. Servidor web o servicio de hosting (Firebase Hosting, Netlify, Vercel, etc.)

## Instrucciones de Despliegue

### Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication con email/password y Google
3. Crea una base de datos Firestore
4. Obtén las credenciales de configuración
5. Reemplaza la configuración en los archivos HTML:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id",
    measurementId: "tu-measurement-id"
};
```

### Despliegue en Firebase Hosting

1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa el proyecto: `firebase init`
   - Selecciona Hosting
   - Selecciona tu proyecto
   - Configura el directorio público (donde están tus archivos HTML)
4. Despliega: `firebase deploy`

### Despliegue en Otros Servicios

Puedes desplegar la aplicación en cualquier servicio de hosting web como Netlify, Vercel, GitHub Pages, etc., simplemente subiendo todos los archivos del proyecto.

## Personalización

- Modifica `styles.css` para cambiar colores, fuentes y estilos
- Actualiza el logo y favicon con tus propias imágenes
- Ajusta el contenido en los archivos HTML según tus necesidades

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

---

© 2023 Sensus - Encuentra tu Calma