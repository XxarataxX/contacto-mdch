const pool = require('../config/dbConfig');

const obtenerContactos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contactos'); // Cambiado a pool.query
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const crearContacto = async (req, res) => {
  try {
    const { email, nombre, telefono } = req.body;
    
    if (!email || !nombre || !telefono) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const [result] = await pool.query(
      'INSERT INTO contactos (email, nombre, telefono) VALUES (?, ?, ?)',
      [email, nombre, telefono]
    );

    res.status(201).json({
      id: result.insertId,
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
  crearContacto
};