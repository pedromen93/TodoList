class Tarea {
  constructor({
    id = null,
    titulo,
    descripcion = null,
    estado = 'pendiente',
    fecha_creacion = new Date(),
    fecha_limite = null,
    prioridad = 'media'
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fecha_creacion = fecha_creacion;
    this.fecha_limite = fecha_limite;
    this.prioridad = prioridad;
  }

  validar() {
    if (!this.titulo) {
      throw new Error('El título de la tarea es obligatorio');
    }

    if (this.estado && !['pendiente', 'completada'].includes(this.estado)) {
      throw new Error('El estado debe ser "pendiente" o "completada"');
    }

    if (this.prioridad && !['baja', 'media', 'alta'].includes(this.prioridad)) {
      throw new Error('La prioridad debe ser "baja", "media" o "alta"');
    }

    return true;
  }
}

module.exports = Tarea;