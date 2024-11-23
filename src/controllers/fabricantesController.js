const fabricantesModel = require("../models/fabricantesModel.js")
const videojuegosModel = require("../models/videojuegosModel.js")

/**
 * Controlador para traer todos los registros de fabricantes.
 * Realiza una consulta a la base de datos y devuelve todos los fabricantes en formato JSON.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} - Responde con los datos de los fabricantes o un mensaje de error.
 */
const traerFabricantes = async (req, res) => {
    try {
        const fabricantes = await fabricantesModel.findAll({ include:[{ model: videojuegosModel, as: "juegos" }]});
        res.json(fabricantes);
    } catch (error) {
        res.json({ message: error.message });
    }
}

/**
 * Controlador para traer un fabricante por su ID.
 * Valida que el ID sea un número entero positivo antes de buscarlo en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} - Responde con los datos del fabricante o mensajes de error en caso de fallos.
 */
const traerFabricantePorId = async (req, res) => {
    try {
        if (!validarEntero(req.params.id)) {
            return res.status(400).json({ message: "El ID debe ser un número entero mayor a 0." });
        }
        const fabricante = await fabricantesModel.findByPk(req.params.id, { include:[{ model: videojuegosModel, as: "juegos" }]});
        if (!fabricante) {
            return res.status(404).json({ message: "Fabricante no encontrado." });
        }
        res.json(fabricante);
    } catch (error) {
        res.json({ message: error.message });
    }
}

/**
 * Controlador para crear un nuevo fabricante.
 * Recibe los datos en el cuerpo de la solicitud y los guarda en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} - Responde con un mensaje de éxito o un mensaje de error.
 */
const crearFabricante = async (req, res) => {
    try {
        await fabricantesModel.create(req.body);
        res.json("registro creado correctamente");
    } catch (error) {
        res.json({ message: error.message });
    }
}

/**
 * Controlador para actualizar un fabricante por su ID.
 * Valida que el ID sea un número entero positivo antes de realizar la actualización.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} - Responde con un mensaje de éxito, error de validación o error de actualización.
 */
const actualizarFabricante = async (req, res) => {
    try {
        if (!validarEntero(req.params.id)) {
            return res.status(400).json({ message: "El ID debe ser un número entero mayor a 0." });
        }
        var result;
        result = await fabricantesModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Fabricante no encontrado o no modifico el registro." });
        }
        res.json("Registro Actualizado Correctamente");
    } catch (error) {
        res.json({ message: error.message });
    }
}

/**
 * Controlador para borrar un fabricante por su ID.
 * Valida que el ID sea un número entero positivo antes de realizar el borrado.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} - Responde con un mensaje de éxito o error.
 */
const borrarFabricante = async (req, res) => {
    try {
        if (!validarEntero(req.params.id)) {
            return res.status(400).json({ message: "El ID debe ser un número entero mayor a 0." });
        }
        await fabricantesModel.destroy({
            where: { id: req.params.id }
        });
        res.json("Registro Borrado Correctamente");
    } catch (error) {
        res.json({ message: error.message });
    }
}

/**
 * Valida si un valor proporcionado es un número entero positivo en formato de cadena.
 * 
 * Esta función utiliza una expresión regular para garantizar que la entrada esté formada 
 * exclusivamente por dígitos numéricos (0-9) y no contenga letras, espacios u otros caracteres. 
 *
 * @param {string} numero - El valor que se desea validar.
 * @returns {boolean} - Devuelve `true` si el valor es un entero positivo válido; de lo contrario, devuelve `false`.
*/
function validarEntero(numero) {
    // Utiliza una expresión regular para validar que el valor está compuesto solo por dígitos numéricos
    const patron = /^\d+$/;

    // Verifica que el valor coincide con el patrón y que sea mayor a 0
    return patron.test(numero) && Number(numero) > 0;
}

module.exports = { traerFabricantes, traerFabricantePorId, crearFabricante, actualizarFabricante, borrarFabricante }