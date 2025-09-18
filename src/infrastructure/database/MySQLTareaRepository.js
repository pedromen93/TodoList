const TareaRepository = require('../../domain/repositories/TareaRepository');
const Tarea = require('../../domain/entities/Tarea');
const pool = require('../config/database');

class MySQLTareaRepository extends TareaRepository {
  async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM tareas');
      return rows.map(row => new Tarea(row));
    } catch (error) {
      console.error('Error al obtener todas las tareas:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      return new Tarea(rows[0]);
    } catch (error) {
      console.error(`Error al obtener la tarea con ID ${id}:`, error);
      throw error;
    }
  }

  async create(tarea) {
    try {
      // Validar la tarea antes de crearla
      tarea.validar();

      const { titulo, descripcion, estado, fecha_limite, prioridad } = tarea;
      
      const [result] = await pool.query(
        'INSERT INTO tareas (titulo, descripcion, estado, fecha_limite, prioridad) VALUES (?, ?, ?, ?, ?)',
        [titulo, descripcion, estado, fecha_limite, prioridad]
      );

      // Devolver la tarea creada con su ID
      return new Tarea({
        id: result.insertId,
        titulo,
        descripcion,
        estado,
        fecha_creacion: new Date(),
        fecha_limite,
        prioridad
      });
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      throw error;
    }
  }

  async update(id, tareaData) {
    try {
      // Verificar si la tarea existe
      const tareaExistente = await this.getById(id);
      if (!tareaExistente) return null;

      // Crear una nueva instancia con los datos actualizados
      const tareaActualizada = new Tarea({
        ...tareaExistente,
        ...tareaData,
        id // Mantener el mismo ID
      });

      // Validar la tarea actualizada
      tareaActualizada.validar();

      const { titulo, descripcion, estado, fecha_limite, prioridad } = tareaActualizada;

      // Actualizar en la base de datos
      await pool.query(
        'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ?, fecha_limite = ?, prioridad = ? WHERE id = ?',
        [titulo, descripcion, estado, fecha_limite, prioridad, id]
      );

      return tareaActualizada;
    } catch (error) {
      console.error(`Error al actualizar la tarea con ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar la tarea con ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = MySQLTareaRepository;