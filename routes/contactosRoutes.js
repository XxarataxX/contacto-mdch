const express = require('express');
const router = express.Router();
const { obtenerContactos, crearContacto, obtenerContactoPorUUID} = require('../controllers/contactosController');

router.get('/', obtenerContactos);
router.get('/:uuid', obtenerContactoPorUUID);
router.post('/', crearContacto);

module.exports = router;