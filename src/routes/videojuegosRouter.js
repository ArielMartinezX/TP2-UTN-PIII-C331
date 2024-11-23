const express = require ("express");

// controladores 
const {traerJuegos, traerJuegoPorId, crearJuego, actualizarJuego, borrarJuego} = require ("../controllers/videojuegosController.js");

/* configurar las rutas express  */// metodos HTTP

const router = express.Router();

router.get ("/", traerJuegos);
router.get ("/:id", traerJuegoPorId);
router.post ("/", crearJuego);
router.put ("/:id", actualizarJuego);
router.delete ("/:id", borrarJuego);

module.exports = router;