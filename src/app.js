const express = require ("express");
const app = express();
const cors = require ("cors");
const { db } = require("./models");

const port = 3030;

const videojuegosRouter = require("./routes/videojuegosRouter.js");
const fabricantesRouter = require("./routes/fabricantesRouter.js");

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Videojuegos API online");
})

app.use("/videojuegos", videojuegosRouter);
app.use("/fabricantes", fabricantesRouter);

/**
 * Sincroniza la base de datos y las tablas del modelo utilizando Sequelize.
 *
 * Esta función realiza dos tareas principales:
 * 1. Establece una conexión con la base de datos mediante `db.authenticate()`.
 *    Esto verifica que las credenciales y la conexión sean correctas.
 * 2. Sincroniza las tablas del modelo con la base de datos mediante `db.sync({ alter: true })`.
 *    La opción `alter: true` permite que Sequelize adapte automáticamente las tablas existentes
 *    para reflejar los cambios en el modelo, como agregar nuevas columnas o actualizar tipos de datos.
 *
 * Si la conexión o la sincronización fallan, se captura y registra el error en la consola.
 *
 * @async
 * @function syncDB
 * @returns {Promise<void>} - No retorna ningún valor; solo registra el estado del proceso.
 * @throws {Error} - Si ocurre un error en la autenticación o sincronización, se muestra en la consola.
 */
const syncDB = async () => {
    try {
        await db.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
        
        // Sincronización de las tablas
        await db.sync({ alter: true }); 
        console.log("Tablas sincronizadas correctamente.");
    } catch (error) {
        console.error("Error al sincronizar las tablas:", error);
    }
};

app.listen (port,()=>{
    syncDB();
    console.log(`Servidor ok en el puerto ${port}`);   
})