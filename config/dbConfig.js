const mysql = require('mysql2/promise');

const config = {
  host: '82.197.94.218', // Ej: 'mi-db.123456789012.us-east-1.rds.amazonaws.com'
  user: 'mysql', // Usuario creado en tu instancia MySQL
  password: '1032', // Contraseña del usuario
  database: 'mdch', // Nombre de la base de datos que creaste
  port: 3006, // Puerto estándar de MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

// Verificar la conexión
pool.getConnection()
  .then(conn => {
    console.log('Conexión exitosa a MySQL en la nube');
    conn.release(); // Liberar la conexión
  })
  .catch(err => {
    console.error('Error de conexión a MySQL:', err);
  });

module.exports = pool;