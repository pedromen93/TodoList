const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tareas',
      version: '1.0.0',
      description: 'API REST para gestionar tareas',
      contact: {
        name: 'Desarrollador',
        email: 'desarrollador@ejemplo.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: [
    path.resolve(__dirname, '../routes/*.js'),
    path.resolve(__dirname, '../controllers/*.js')
  ],
  failOnErrors: true
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
};