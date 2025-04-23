const pool = require('../config/dbConfig');

const obtenerContactos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contactos'); // Cambiado a pool.query
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerContactoPorUUID = async (req, res) => {
    try {
      const { uuid } = req.params;
      const [rows] = await pool.query('SELECT * FROM contactos WHERE uuid = ?', [uuid]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }
      
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

const crearContacto = async (req, res) => {
  try {
    const { uuid, email, nombre, telefono } = req.body;
      
    
    if (!uuid || !email || !nombre || !telefono) {
        return res.status(400).json({ 
          error: 'Faltan campos obligatorios',
          required: ['uuid', 'email', 'nombre', 'telefono']
        });
      }

      const [result] = await pool.query(
        'INSERT INTO contactos (uuid, email, nombre, telefono) VALUES (?, ?, ?, ?)',
        [uuid, email, nombre, telefono]
      );


      res.status(201).json({
        id: result.insertId,
        uuid,
        email,
        nombre,
        telefono
      });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'El email ya existe' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  obtenerContactos,
  obtenerContactoPorUUID,
  crearContacto
};