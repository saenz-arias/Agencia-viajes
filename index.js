import express from 'express';  //Imports JS
import router from './routes/index.js';
import db from './config/db.js';
// dotenv.config({path: 'variables.env'});
// import('dotenv').config({path: 'variables.env'});

// configurar express
const app = express();

// Conectar base de datos
db.authenticate()
     .then( () => console.log('Base de datos conectada')) 
     .catch( error => console.log(error));

// Definir puerto Localhost
// const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual - Uso de Middleware
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta Public
app.use(express.static('public'));

// Agregar router "use" abarca todos los verbos: put, delete, post, patch, get
app.use('/', router);


// app.listen(port, () => {
//       console.log(`El servidor esta funcionando en el puerto ${port}`)
//   })

// Puerto y host para la app en produccion
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando en Heroku');
})