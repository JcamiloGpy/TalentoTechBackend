const dotenv = require("dotenv");
dotenv.config(); // Cargar las variables de entorno

const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

// Middleware CORS (permitir solicitudes de cualquier origen)
app.use(cors());

// Middleware para recibir datos en formato JSON
app.use(express.json());

// Rutas principales
app.use("/api", router);

// Inicializar el servidor
const PORT = process.env.PORT || 3000; // Usar el puerto configurado en .env o el puerto 3000 por defecto
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});