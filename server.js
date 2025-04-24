const express = require('express');
const bodyParser = require('body-parser');
const contactosRoutes = require('./routes/contactosRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'https://mdch-contactocharrofront.5n7tjo.easypanel.host'
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    credentials: true
  };
  

  app.use(cors(corsOptions)); 
// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/contactos', contactosRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});