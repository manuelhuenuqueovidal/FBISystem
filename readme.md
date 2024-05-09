## Desafío FBI System.

Este proyecto implementa autenticación JWT en una aplicación Node.js utilizando Express.

## Instalación.

Instala las dependencias con npm install.

## Uso..
Inicia el servidor: npm start.
Accede a http://localhost:3000/SignIn para obtener un token JWT con credenciales de usuario.
Utiliza el token para acceder al área restringida: http://localhost:3000/restringida?token=TU_TOKEN.

## Estructura.

data/: Datos simulados (base de datos de agentes).
public/: Archivos estáticos (HTML, CSS, etc.).
app.js: Punto de entrada de la aplicación.
package.json: Configuración de npm.