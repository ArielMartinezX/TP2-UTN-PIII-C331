const express = require ("express");

// controladores 
const {traerFabricantes, traerFabricantePorId, crearFabricante, actualizarFabricante, borrarFabricante} = require ("../controllers/fabricantesController.js");

/* configurar las rutas express  */// metodos HTTP;
const router = express.Router();

router.get ("/", traerFabricantes);
router.get ("/:id", traerFabricantePorId);
router.post ("/", crearFabricante);
router.put ("/:id", actualizarFabricante);
router.delete ("/:id", borrarFabricante);

module.exports = router;