const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
  try {
    // Crear conexión sin especificar base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'todo_list'};`);
    
    // Cerrar la conexión inicial
    await connection.end();
    
    // Obtener la conexión del pool (ya configurada con la base de datos)
    const pool = require('../config/database');
    
    // Crear la tabla de tareas si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tareas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        estado ENUM('pendiente', 'completada') NOT NULL DEFAULT 'pendiente',
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_limite DATE,
        prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media'
      );
    `);
    
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

module.exports = { initDatabase };