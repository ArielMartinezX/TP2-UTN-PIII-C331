const Sequelize = require("sequelize");
const db = require("../data/db.js");

const Fabricantes = require("./fabricantesModel.js");
const Juegos = require("./videojuegosModel.js");

// Inicializar los modelos
const models = {
    fabricantes: Fabricantes,
    juegos: Juegos,
};

// Registrar las asociaciones
Object.keys(models).forEach((modelName) => {
    console.log("FUNCIONA");
    
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Exportar modelos y conexión
module.exports = { ...models, db };
