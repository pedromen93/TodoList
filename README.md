# API de Tareas con Node

Esta es una API REST para gestionar tareas, implementada con Node.js, Express y MySQL siguiendo los principios de Clean Architecture.

## Estructura del Proyecto

El proyecto sigue la arquitectura limpia con las siguientes capas:

- **Domain**: Contiene las entidades y las interfaces de los repositorios.
- **Application**: Contiene los casos de uso que implementan la lógica de negocio.
- **Infrastructure**: Contiene la implementación de los repositorios y la configuración de la base de datos.
- **Interfaces**: Contiene los controladores, rutas y la configuración de la API.

## Requisitos

- Node.js
- MySQL

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Configurar la base de datos MySQL:

- Crear una base de datos llamada `todo_list`
- Configurar las credenciales en el archivo `.env`

## Configuración

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_list
PORT=3000
```

## Ejecución

```bash
node index.js
```

La API estará disponible en `http://localhost:3000`

La documentación de la API (Swagger) estará disponible en `http://localhost:3000/api-docs`

## Endpoints

### Tareas

- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener una tarea por ID
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea existente
- `DELETE /api/tasks/:id` - Eliminar una tarea

## Modelo de Datos

### Tarea

```
{
  "id": 1,
  "titulo": "Completar informe",
  "descripcion": "Finalizar el informe trimestral de ventas",
  "estado": "pendiente",
  "fecha_creacion": "2023-09-15T10:30:00Z",
  "fecha_limite": "2023-09-20",
  "prioridad": "alta"
}
```

## Tecnologías Utilizadas

- Node.js
- Express
- MySQL
- Swagger (documentación de la API)
- Clean Architecture
