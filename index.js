//Cargar los módulos necesarios.
const express = require('express');
const agentes = require('./data/agentes.js');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const secretKey = 'Mi Llave Ultra Secreta';

//Configurar Express para servir archivos estáticos desde la carpeta 'public'.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Iniciar el servidor en el puerto 3000.
app.listen(3000, () => console.log('Servidor encendido en el puerto 3000'));

//Autenticación y generación de token.
app.get('/SignIn', (req, res) => {
    const { email, password } = req.query;

    //Buscar al usuario en la base de datos.
    const user = agentes.results.find((u) => u.email === email && u.password === password);

    if (user) {
        //Se genera token con tiempo de expiración de 2 minutos.
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 120,
                data: user,
            },
            secretKey
        );

        //Se envia respuesta con el token y un enlace al área restringida.
        res.send(`
            <a href="/restringida?token=${token}"> <p> Ir al área restringida </p> </a>
            Agente autorizado, ${email}.
            <script>
                localStorage.setItem('token', JSON.stringify("${token}"))
            </script>
            <img style="width: 100%;" src="/assets/img/655bdbec2bca96.38822946.webp" alt="Mi imagen">
        `);
    } else {
        //Si las credenciales son incorrectas, se envia un mensaje de error.
        res.send(`
        Usuario no autorizado, credenciales incorrectas.
        <img style="width: 100%;" src="/assets/img/error.jpg" alt="Error">
    `);
    }
});

//Acceso al área restringida.
app.get('/restringida', (req, res) => {
    let { token } = req.query;

    //Se verifica la validez del token.
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            //Si hay un error de verificación, se envia código de error 401.
            res.status(401).send({
                error: '401 Unauthorized',
                message: err.message,
            });
        } else {
            //Si el token es válido, se envia un mensaje de bienvenida al área restringida.
            res.send(`
            <h1 >Bienvenido al área restringida ${decoded.data.email}</h1>
            <img style="width: 100%;" src="/assets/img/HD-wallpaper-government-fbi.jpg" alt="Mi imagen">
        `);
        }
    });
});