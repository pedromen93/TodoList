const Tarea = require('../../domain/entities/Tarea');

class TareaUseCases {
  constructor(tareaRepository) {
    this.tareaRepository = tareaRepository;
  }

  /**
   * Obtiene todas las tareas
   * @returns {Promise<Array>} Lista de tareas
   */
  async obtenerTodasLasTareas() {
    return await this.tareaRepository.getAll();
  }

  /**
   * Obtiene una tarea por su ID
   * @param {number} id - ID de la tarea
   * @returns {Promise<Object>} Tarea encontrada
   * @throws {Error} Si la tarea no existe
   */
  async obtenerTareaPorId(id) {
    const tarea = await this.tareaRepository.getById(id);
    if (!tarea) {
      throw new Error(`No se encontró la tarea con ID ${id}`);
    }
    return tarea;
  }

  /**
   * Crea una nueva tarea
   * @param {Object} tareaData - Datos de la tarea a crear
   * @returns {Promise<Object>} Tarea creada
   */
  async crearTarea(tareaData) {
    const tarea = new Tarea(tareaData);
    return await this.tareaRepository.create(tarea);
  }

  /**
   * Actualiza una tarea existente
   * @param {number} id - ID de la tarea a actualizar
   * @param {Object} tareaData - Nuevos datos de la tarea
   * @returns {Promise<Object>} Tarea actualizada
   * @throws {Error} Si la tarea no existe
   */
  async actualizarTarea(id, tareaData) {
    const tareaActualizada = await this.tareaRepository.update(id, tareaData);
    if (!tareaActualizada) {
      throw new Error(`No se encontró la tarea con ID ${id}`);
    }
    return tareaActualizada;
  }

  /**
   * Elimina una tarea por su ID
   * @param {number} id - ID de la tarea a eliminar
   * @returns {Promise<boolean>} true si se eliminó correctamente
   * @throws {Error} Si la tarea no existe
   */
  async eliminarTarea(id) {
    const resultado = await this.tareaRepository.delete(id);
    if (!resultado) {
      throw new Error(`No se encontró la tarea con ID ${id}`);
    }
    return true;
  }
}

module.exports = TareaUseCases;