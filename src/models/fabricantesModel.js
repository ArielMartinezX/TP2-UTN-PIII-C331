const db = require ("../data/db.js");

const {DataTypes} = require ("sequelize");

const fabricantesModel = db.define ("fabricantes",{
    name : {type:DataTypes.STRING},
    surname : {type:DataTypes.STRING},
})

/**
 * Establece la relación entre `fabricantesModel` y `juegosModel`.
 * Define una relación de "uno a muchos" donde un fabricante puede tener múltiples juegos asociados.
 * La clave foránea `manufacturer` en el modelo `juegos` hace referencia a la clave primaria `id` en el modelo `fabricantes`.
 * La asociación es referenciada como `juegos` en el modelo `fabricantes`.
 *
 * @param {Object} models - El objeto que contiene todos los modelos definidos.
 */
fabricantesModel.associate = (models) => {
    fabricantesModel.hasMany(models.juegos, { foreignKey: 'manufacturer', as: 'juegos' });
};

module.exports = fabricantesModel;
