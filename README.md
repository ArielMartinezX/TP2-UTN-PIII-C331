# **API de Videojuegos**
### **Descripción del Proyecto**
Este proyecto es una API temática de videojuegos desarrollada utilizando Node.js con Express como framework. La API gestiona información sobre videojuegos y sus fabricantes, implementando relaciones entre tablas mediante Sequelize, un ORM que facilita la interacción con una base de datos MySQL.

Características principales
- 📂 Modelos estructurados: Tablas de juegos y fabricantes con relaciones uno-a-muchos.
- 🔄 Operaciones CRUD: Permite la creación, lectura, actualización y eliminación de videojuegos y/o fabricantes.
- ⚙️ Sincronización automática: Las tablas de la base de datos se sincronizan dinámicamente según los modelos definidos.
- 🛠️ Diseño modular: Separación de responsabilidades mediante rutas, controladores y modelos.

Esta API es ideal para proyectos que requieran gestionar catálogos, relaciones entre entidades y operaciones en bases de datos relacionales.

## **Instrucciones para ejecutar el proyecto localmente**

### **Requisitos previos**
Tener instalados los siguientes programas en la computadora:
- **Node.js** 
- **MySQL** (con MySQL Workbench para administrar la base de datos)
- **Nodemon** (para reinicio automático del servidor en desarrollo)

### **Pasos para ejecutar el proyecto**

- Ejecutar el comando npm install.
- Configurar el archivo db.js segun configuracion local de mysql.
- Ejecutar el comando nodemon app.js

## **API - Ejemplos de Peticiones**

### **1. Inicio**
- **Método**: GET
- **Ruta**: `/`
- **Descripción**: Verifica si el servidor está funcionando.
  
  **Ejemplo de Request**:
  ```http
  GET http://localhost:3030/

### **2. Traer todos los Juegos sin query params**
- **Método**: GET
- **Ruta**: `/videojuegos`
- **Descripción**: Trae todos los registros de los juegos vinculados con sus fabricantes.
  
  **Ejemplo de Request**:
  ```http
  GET localhost:3030/videojuegos

### **3. Traer todos los Juegos con query params**
- **Método**: GET
- **Ruta**: `/videojuegos`
- **Descripción**: Trae todos los registros de los juegos vinculados con sus fabricantes con los filtros solicitados en la consigna.
  
  **Ejemplo de Request**:
  ```http
  GET http://localhost:3030/videojuegos?page=2&limit=2&sort=DESC&categorie=aventura&status=active

### **4. Traer un Videojuego por ID**
- **Método**: GET
- **Ruta**: `/videojuegos/:id`
- **Descripción**:  Trae un videojuego específico usando su ID.
  
  **Ejemplo de Request**:
  ```http
  GET http://localhost:3030/videojuegos/5

### **5. Crear un Videojuego**
- **Método**: POST
- **Ruta**: `/videojuegos`
- **Descripción**:  Crea un nuevo videojuego.
  
  **Ejemplo de Request**:
  ```http
    POST http://localhost:3030/videojuegos
    Content-Type: application/json
    Body:
    {
    "title": "X-Men",
    "categorie": "Aventura",
    "manufacturer": 4,
    "price": "300",
    "status": "active"
    }

### **6. Actualizar un Videojuego**
- **Método**: PUT
- **Ruta**: `/videojuegos/:id`
- **Descripción**:   Actualiza los datos de un videojuego específico usando su ID.
  
  **Ejemplo de Request**:
  ```http
    PUT http://localhost:3030/videojuegos/4
    Content-Type: application/json
    Body:
    {
    "title": "Megaman-X",
    "categorie": "Shooter",
    "manufacturer": 4,
    "price": "3000",
    "status": "active"
    }

### **7. Borrar un Videojuego**
- **Método**: DELETE
- **Ruta**: `/videojuegos/:id`
- **Descripción**:  Elimina un videojuego específico usando su ID.
  
  **Ejemplo de Request**:
  ```http
  DELETE http://localhost:3030/videojuegos/7   

### **8. Traer todos los Fabricantes**
- **Método**: GET
- **Ruta**: `/fabricantes`
- **Descripción**: Obtiene todos los fabricantes disponibles.
  
  **Ejemplo de Request**:
  ```http
  GET http://localhost:3030/fabricantes  

### **9. Traer un Fabricante por ID**
- **Método**: GET
- **Ruta**: `/fabricantes/:id`
- **Descripción**: Obtiene un fabricante específico usando su ID.
  
  **Ejemplo de Request**:
  ```http
  GET http://localhost:3030/fabricantes/4  

### **10. Crear un Fabricante**
- **Método**: POST
- **Ruta**: `/fabricantes`
- **Descripción**:  Crea un nuevo fabricante.
  
  **Ejemplo de Request**:
  ```http
    POST http://localhost:3030/fabricantes
    Content-Type: application/json
    Body:
    {
    "name": "Timi",
    "surname": "Studios"
    }

### **11. Actualizar un Fabricante**
- **Método**: PUT
- **Ruta**: `Actualizar un Fabricante`
- **Descripción**:  Crea un nuevo fabricante.
  
  **Ejemplo de Request**:
  ```http
    PUT http://localhost:3030/fabricantes/4
    Content-Type: application/json
    Body:
    {
    "name": "Timi",
    "surname": "Robar es malo"
    }

### **12. Borrar un Fabricante**
- **Método**: DELETE
- **Ruta**: `/videojuegos/:id`
- **Descripción**:  Elimina un fabricante específico usando su ID.
  
  **Ejemplo de Request**:
  ```http
  DELETE http://localhost:3030/fabricantes/1

## **Archivos de ejemplos JSON**

- Se encuentran ubicados dentro de la carpeta `/src/data` con el nombre `/src/data/fabricantes.json` y `/src/data/juegos.json`.