const express = require('express');
const bodyParser = require('body-parser');
const contactosRoutes = require('./routes/contactosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    // Permite solicitudes desde múltiples orígenes (útil para desarrollo)
    const allowedOrigins = [
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'https://mdch-contactocharrofront.5n7tjo.easypanel.host/'
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    // Métodos permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    
    // Headers permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Permitir el envío de cookies/tokens (si es necesario)
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

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