const db = require ("../data/db.js");
const {DataTypes} = require ("sequelize");

const videojuegosModel = db.define ("juegos",{
    title : {type:DataTypes.STRING},
    categorie : {type:DataTypes.STRING},
    manufacturer : {type:DataTypes.INTEGER},
    price : {type:DataTypes.DECIMAL},
    status: {type:DataTypes.ENUM('active','inactive')}
});

/**
 * Establece la relación entre `videojuegosModel` y `fabricantesModel`.
 * Define una relación de "pertenencia" donde cada videojuego pertenece a un fabricante específico.
 * La clave foránea `manufacturer` en el modelo `videojuegos` hace referencia a la clave primaria `id` en el modelo `fabricantes`.
 * La asociación es referenciada como `fabricante` en el modelo `videojuegos`.
 *
 * @param {Object} models - El objeto que contiene todos los modelos definidos.
 */
videojuegosModel.associate = (models) => {
    videojuegosModel.belongsTo(models.fabricantes, { foreignKey: 'manufacturer', as: 'fabricante' });
};

module.exports = videojuegosModel;

