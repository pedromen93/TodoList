/**
 * Interfaz para el repositorio de tareas
 * Define los métodos que debe implementar cualquier repositorio de tareas
 */
class TareaRepository {
  /**
   * Obtiene todas las tareas
   * @returns {Promise<Array>} Lista de tareas
   */
  async getAll() {
    throw new Error('El método getAll debe ser implementado');
  }

  /**
   * Obtiene una tarea por su ID
   * @param {number} id - ID de la tarea
   * @returns {Promise<Object>} Tarea encontrada o null
   */
  async getById(id) {
    throw new Error('El método getById debe ser implementado');
  }

  /**
   * Crea una nueva tarea
   * @param {Object} tarea - Datos de la tarea a crear
   * @returns {Promise<Object>} Tarea creada
   */
  async create(tarea) {
    throw new Error('El método create debe ser implementado');
  }

  /**
   * Actualiza una tarea existente
   * @param {number} id - ID de la tarea a actualizar
   * @param {Object} tarea - Nuevos datos de la tarea
   * @returns {Promise<Object>} Tarea actualizada o null si no existe
   */
  async update(id, tarea) {
    throw new Error('El método update debe ser implementado');
  }

  /**
   * Elimina una tarea por su ID
   * @param {number} id - ID de la tarea a eliminar
   * @returns {Promise<boolean>} true si se eliminó, false si no existía
   */
  async delete(id) {
    throw new Error('El método delete debe ser implementado');
  }
}

module.exports = TareaRepository;