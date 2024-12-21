const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost', // Valor predeterminado para host
  port: process.env.MYSQL_PORT || 3306,       // Valor predeterminado para puerto
  user: process.env.MYSQL_USER || 'root',     // Valor predeterminado para usuario
  password: process.env.MYSQL_PASSWORD || '', // Sin contraseña por defecto
  database: process.env.MYSQL_DATABASE || 'productos', // Valor predeterminado para base de datos
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos: ' + error.stack);
    process.exit(1); // Finaliza el proceso si no puede conectarse
  }
  console.log('Conexión exitosa a la base de datos');
});

// Exportar la conexión
module.exports = connection;