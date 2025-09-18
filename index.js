const express = require('express');
require('dotenv').config();

// Importar componentes de la aplicación
const { initDatabase } = require('./src/infrastructure/database/init-db');
const MySQLTareaRepository = require('./src/infrastructure/database/MySQLTareaRepository');
const TareaUseCases = require('./src/application/use_cases/TareaUseCases');
const TareaController = require('./src/interfaces/controllers/TareaController');
const setupSwagger = require('./src/interfaces/config/swagger');

// Crear instancias siguiendo el patrón de inyección de dependencias
const tareaRepository = new MySQLTareaRepository();
const tareaUseCases = new TareaUseCases(tareaRepository);
const tareaController = new TareaController(tareaUseCases);

// Configurar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para leer JSON en las peticiones
app.use(express.json());

// Configurar rutas
const tareaRoutes = require('./src/interfaces/routes/tareaRoutes')(tareaController);
app.use('/api/tasks', tareaRoutes);

// Configurar Swagger - Colocamos esto después de configurar las rutas
setupSwagger(app);

// Ruta principal
app.get('/', (req, res) => {
  res.send('🚀 API de Tareas funcionando! Visita <a href="/api-docs">Documentación API</a>');
});

// Iniciar el servidor
async function startServer() {
  try {
    // Inicializar la base de datos
    await initDatabase();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
