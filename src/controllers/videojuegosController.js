const fabricantesModel = require("../models/fabricantesModel.js");
const videojuegosModel = require("../models/videojuegosModel.js");
const moment = require("moment");

/**
 * Obtiene una lista de videojuegos según los parámetros de consulta.
 *
 * @param {Object} req - Objeto de solicitud (Request).
 * @param {Object} req.query - Parámetros de consulta de la solicitud.
 * @param {string} [req.query.page] - Número de la página para la paginación (opcional).
 * @param {string} [req.query.limit] - Cantidad de resultados por página (opcional).
 * @param {string} [req.query.sort] - Orden de los resultados, puede ser "ASC" o "DESC" (opcional).
 * @param {string} [req.query.categorie] - Filtrar por categoría (opcional).
 * @param {string} [req.query.status] - Filtrar por estado ("active" o "inactive") (opcional).
 * @param {Object} res - Objeto de respuesta (Response).
 * @returns {Promise<void>} Envía la lista de videojuegos o un mensaje de error.
 */
const traerJuegos = async (req, res) => {
    try {
        const { page, limit, sort, categorie, status } = req.query;

        let criterioBusqueda = {};

        // Si no se pasan `page` y `limit`, no aplico paginación
        if (page && limit) {
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);

            if (isNaN(pageNumber) || pageNumber < 1) {
                return res.status(400).json({ message: "El parámetro 'page' debe ser un número mayor que 0." });
            }
            if (isNaN(limitNumber) || limitNumber < 1) {
                return res.status(400).json({ message: "El parámetro 'limit' debe ser un número mayor que 0." });
            }

            // Calculo el offset para la paginación
            const offset = (pageNumber - 1) * limitNumber;

            // Asigno paginación
            criterioBusqueda.offset = offset;
            criterioBusqueda.limit = limitNumber;
        }

        // Ordeno solo si se pasa el parámetro `sort`
        if (sort) {
            const order = sort === "ASC" ? ["createdAt", "ASC"] : ["createdAt", "DESC"];
            criterioBusqueda.order = [order];
        }

        // Filtro por `categorie` y `status` solo si se pasan esos parámetros
        const where = {};
        if (categorie){
            where.categorie = categorie;
        }
        if (status){
            where.status = status;
        } 
        if (Object.keys(where).length > 0){
            criterioBusqueda.where = where;
        } 

        // Consulto la base de datos con los criterios de búsqueda
        criterioBusqueda.include = [{ model: fabricantesModel, as: "fabricante" }]
        const juegos = await videojuegosModel.findAll(criterioBusqueda);
        res.json(juegos);
    } catch (error) {
        console.error("Error en traerJuegos:", error);
        res.json({ message: error.message });
    }
};

/**
 * Obtiene un videojuego por su ID.
 *
 * @param {Object} req - Objeto de solicitud (Request).
 * @param {Object} res - Objeto de respuesta (Response).
 * @returns {Promise<void>} Envía el videojuego encontrado o un mensaje de error.
 */
const traerJuegoPorId = async (req, res) => {
    try {
        if(!validarEntero(req.params.id)) {
            return res.status(400).json({ message: "El ID debe ser un número entero mayor a 0." });
        }
        const juego = await videojuegosModel.findByPk(req.params.id, { include:[{ model: fabricantesModel, as: "fabricante" }]});
        if(!juego){
            return res.status(404).json({ message: "Videojuego no encontrado." });
        }
        res.json(juego);
    } catch (error) {
        res.json({ message: error.message });
    }
};

/**
 * Crea un nuevo videojuego en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud (Request).
 * @param {Object} req.body - Datos del videojuego a crear.
 * @param {Object} res - Objeto de respuesta (Response).
 * @returns {Promise<void>} Envía un mensaje de éxito o error.
 */
const crearJuego = async (req, res) => {
    try {
        await videojuegosModel.create(req.body);
        console.log("Registro creado correctamente");
        res.json("Registro creado correctamente");
    } catch (error) {
        res.json({ message: error.message });
    }
};

/**
 * Actualiza un videojuego existente en la base de datos.
 *
 * @param {Object} req - Objeto de solicitud (Request).
 * @param {Object} req.body - Datos actualizados del videojuego.
 * @param {Object} res - Objeto de respuesta (Response).
 * @returns {Promise<void>} Envía un mensaje de éxito o error.
 */
const actualizarJuego = async (req, res) => {
    try {
        if(!validarEntero(req.params.id)) {
            return res.status(400).json({ message: "El ID debe ser un número entero mayor a 0." });
        }
        const juego = await videojuegosModel.findByPk(req.params.id);
        if(!juego){
            return res.status(404).json({ message: "Videojuego no encontrado." });
        }
        var result;
        result = await videojuegosModel.update(req.body, {
            where: { id: req.params.id },
        });
        if(result[0] === 0){
            return res.status(404).json({ message: "No se modifico el registro / no se encontraron nuevos cambios." });
        }
        res.json("Registro Actualizado Correctamente");
    } catch (error) {
        res.json({ message: error.message });
    }
};

/**
 * Elimina un videojuego de la base de datos.
 *
 * @param {Object} req - Objeto de solicitud (Request).
 * @param {Object} res - Objeto de respuesta (Response).
 * @returns {Promise<void>} Envía un mensaje de éxito o error.
 */
const borrarJuego = async (req, res) => {
    try {
        if(!validarEntero(req.params.id)) {
            return res.status(400).json({ message: "El ID debe ser un número entero mayor a 0." });
        }
        const juego = await videojuegosModel.findByPk(req.params.id);
        if(!juego){
            return res.status(404).json({ message: "Videojuego no encontrado." });
        }
        await videojuegosModel.destroy({
            where: { id: req.params.id },
        });
        res.json("Registro Borrado Correctamente");
    } catch (error) {
        res.json({ message: error.message });
    }
};

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


module.exports = { traerJuegos, traerJuegoPorId, crearJuego, actualizarJuego, borrarJuego };
