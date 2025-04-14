require('dotenv').config();  // Cargar las variables de entorno

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const auth = require('./middleware/auth')

const productsRoutes = require('./routes/productRoutes')
const menusRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')

const swaggerConfig = require('./swaggerConfig');


const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));


const app = express();
swaggerConfig(app);

  //Esto solo deja entrar a los orígenes definidos en whitelist.
  const whitelist = ['http://localhost:3000', 'https://tudominio.com'];
  
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  
app.use(cors(corsOptionsDelegate))
app.use(express.json());

// Usar las rutas de productos con el prefijo '/api/products'
app.use('/api/products', productsRoutes);  // Aquí asignamos el prefijo '/api/products' a las rutas
app.use('/api/menus', menusRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);


  
  app.listen(3000, ()=>{
      console.log ('Serveur lancé')
  })
  


  module.exports = app;