const {Sequelize} = require ("sequelize")

/* nombre de la db- user - contraseña - {donde esta alojada, lenguaje, puerto} */
const db = new Sequelize ("videojuegos","root","",{
    host : "localhost",
    dialect:"mysql",
    port: 3307
})

module.exports = db