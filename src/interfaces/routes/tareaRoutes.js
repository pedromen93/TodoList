const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarea:
 *       type: object
 *       required:
 *         - titulo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la tarea
 *         titulo:
 *           type: string
 *           description: Título de la tarea
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la tarea
 *         estado:
 *           type: string
 *           enum: [pendiente, completada]
 *           default: pendiente
 *           description: Estado actual de la tarea
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea
 *         fecha_limite:
 *           type: string
 *           format: date
 *           description: Fecha límite para completar la tarea
 *         prioridad:
 *           type: string
 *           enum: [baja, media, alta]
 *           default: media
 *           description: Nivel de prioridad de la tarea
 *       example:
 *         id: 1
 *         titulo: Completar informe
 *         descripcion: Finalizar el informe trimestral de ventas
 *         estado: pendiente
 *         fecha_creacion: 2023-09-15T10:30:00Z
 *         fecha_limite: 2023-09-20
 *         prioridad: alta
 *     NuevaTarea:
 *       type: object
 *       required:
 *         - titulo
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título de la tarea
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la tarea
 *         estado:
 *           type: string
 *           enum: [pendiente, completada]
 *           description: Estado de la tarea
 *         fecha_limite:
 *           type: string
 *           format: date
 *           description: Fecha límite para completar la tarea
 *         prioridad:
 *           type: string
 *           enum: [baja, media, alta]
 *           description: Nivel de prioridad de la tarea
 *     ActualizarTarea:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título de la tarea
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la tarea
 *         estado:
 *           type: string
 *           enum: [pendiente, completada]
 *           description: Estado de la tarea
 *         fecha_limite:
 *           type: string
 *           format: date
 *           description: Fecha límite para completar la tarea
 *         prioridad:
 *           type: string
 *           enum: [baja, media, alta]
 *           description: Nivel de prioridad de la tarea
 */

module.exports = (tareaController) => {
  // Obtener todas las tareas
  router.get('/', tareaController.obtenerTareas.bind(tareaController));

  // Obtener una tarea por ID
  router.get('/:id', tareaController.obtenerTareaPorId.bind(tareaController));

  // Crear una nueva tarea
  router.post('/', tareaController.crearTarea.bind(tareaController));

  // Actualizar una tarea existente
  router.put('/:id', tareaController.actualizarTarea.bind(tareaController));

  // Eliminar una tarea
  router.delete('/:id', tareaController.eliminarTarea.bind(tareaController));

  return router;
};