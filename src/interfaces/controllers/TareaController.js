class TareaController {
  constructor(tareaUseCases) {
    this.tareaUseCases = tareaUseCases;
  }

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     summary: Listar todas las tareas
   *     tags: [Tareas]
   *     responses:
   *       200:
   *         description: Tareas obtenidas correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Tarea'
   *       500:
   *         description: Error interno
   */
  async obtenerTareas(req, res) {
    try {
      const tareas = await this.tareaUseCases.obtenerTodasLasTareas();
      res.json(tareas);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   get:
   *     summary: Buscar tarea por ID
   *     tags: [Tareas]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Identificador único de la tarea
   *     responses:
   *       200:
   *         description: Tarea localizada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tarea'
   *       404:
   *         description: No existe la tarea
   *       500:
   *         description: Error interno
   */
  async obtenerTareaPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const tarea = await this.tareaUseCases.obtenerTareaPorId(id);
      res.json(tarea);
    } catch (error) {
      console.error(`Error al obtener tarea con ID ${req.params.id}:`, error);
      if (error.message.includes('No se encontró')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al obtener la tarea' });
      }
    }
  }

  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Crear nueva tarea
   *     tags: [Tareas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NuevaTarea'
   *     responses:
   *       201:
   *         description: Tarea creada con éxito
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tarea'
   *       400:
   *         description: Información incorrecta
   *       500:
   *         description: Error interno
   */
  async crearTarea(req, res) {
    try {
      const nuevaTarea = await this.tareaUseCases.crearTarea(req.body);
      res.status(201).json(nuevaTarea);
    } catch (error) {
      console.error('Error al crear tarea:', error);
      if (error.message.includes('obligatorio') || error.message.includes('debe ser')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al crear la tarea' });
      }
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   put:
   *     summary: Modificar tarea
   *     tags: [Tareas]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Identificador de la tarea
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ActualizarTarea'
   *     responses:
   *       200:
   *         description: Cambios guardados
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tarea'
   *       400:
   *         description: Información incorrecta
   *       404:
   *         description: No existe la tarea
   *       500:
   *         description: Error interno
   */
  async actualizarTarea(req, res) {
    try {
      const id = parseInt(req.params.id);
      const tareaActualizada = await this.tareaUseCases.actualizarTarea(id, req.body);
      res.json(tareaActualizada);
    } catch (error) {
      console.error(`Error al actualizar tarea con ID ${req.params.id}:`, error);
      if (error.message.includes('No se encontró')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('obligatorio') || error.message.includes('debe ser')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
      }
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   delete:
   *     summary: Borrar tarea
   *     tags: [Tareas]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Identificador de la tarea
   *     responses:
   *       200:
   *         description: Tarea eliminada
   *       404:
   *         description: No existe la tarea
   *       500:
   *         description: Error interno
   */
  async eliminarTarea(req, res) {
    try {
      const id = parseInt(req.params.id);
      await this.tareaUseCases.eliminarTarea(id);
      res.json({ mensaje: 'Tarea eliminada exitosamente' });
    } catch (error) {
      console.error(`Error al eliminar tarea con ID ${req.params.id}:`, error);
      if (error.message.includes('No se encontró')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
      }
    }
  }
}

module.exports = TareaController;