const express = require('express');
const router = express.Router();
const { obtenerContactos, crearContacto } = require('../controllers/contactosController');

router.get('/', obtenerContactos);
router.post('/', crearContacto);

module.exports = router;