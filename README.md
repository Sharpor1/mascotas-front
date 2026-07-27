# MascotasApp - Frontend

Aplicación web desarrollada con React + Vite para gestionar mascotas y sus comentarios, consumiendo la API de MascotasApp.

## Dependencias principales

- **React** - Framework de UI
- **Vite** - Herramienta de build y desarrollo
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para consumir la API
- **Bootstrap** - Framework CSS para estilos

## Estructura del proyecto

```
mascotas-front/
├── src/
│   ├── api/
│   │   └── api.js                  # Instancia de Axios (conexión con la API)
│   ├── components/
│   │   ├── mascotas/
│   │   │   ├── MascotasList.jsx    # Listado de mascotas
│   │   │   ├── MascotasDetail.jsx  # Detalle de una mascota
│   │   │   └── MascotasForm.jsx    # Formulario para registrar/editar mascota
│   │   └── comentarios/
│   │       └── Comentarios.jsx     # Gestión de comentarios (agregar/eliminar)
│   ├── pages/
│   │   └── MascotasPage.jsx        # Página principal de mascotas
│   └── App.jsx                     # Rutas y navegación
```

## Instrucciones de ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la producción
npm run preview

# Ejecutar linter
npm run lint
```

La aplicación estará disponible en `http://localhost:5173`.

## Funcionalidades implementadas

### Conexión con la API
- Instancia de Axios configurada apuntando a `https://vrodriguezvc.pythonanywhere.com/api/`

### Gestión de mascotas
- **Listar mascotas** (GET `/api/mascotas/`) - Muestra información principal: nombre, imagen, descripción, edad y raza
- **Ver detalle de mascota** (GET `/api/mascotas/{id}/`) - Muestra toda la información incluyendo error 404 si no se encuentra
- **Registrar mascota** (POST `/api/mascotas/`) - Formulario con carga de imagen mediante FormData, incluye selección de estado, tipo, sexo y tamaño desde la API

- **Editar mascota** (PATCH `/api/mascotas/{id}/`) - Abre el formulario con la información ya cargada de la mascota a editar, permite actualizar campos individuales
- **Eliminar mascota** (DELETE `/api/mascotas/{id}/`) - Botón de eliminación con confirmación del usuario

### Gestión de catálogos
- **Carga dinámica de opciones** (GET `/api/choices/`) - Los selectores de estado, tipo de animal, sexo y tamaño se cargan dinámicamente desde la API en vez de estar hardcodeados

### Gestión de comentarios
- **Agregar comentario** (POST) - Formulario para agregar un comentario a una mascota con autor y contenido
- **Eliminar comentario** (DELETE) - Botón de eliminación con confirmación del usuario

### Manejo de errores
- Manejo de errores en todas las peticiones utilizando `error.response?.status` y `error.response?.data`
- Diferenciación en la interfaz de errores 400 (validación con mensajes detallados por campo) y 404 (no encontrado)

## Herramientas de IA utilizadas

- **OpenCode (big-pickle)** - Se utilizó como asistente de desarrollo para:
  - Revisión y documentación de la estructura del proyecto
  - Implementación de funcionalidades CRUD (crear, editar, eliminar mascotas)
  - Implementación de gestión de comentarios (agregar, eliminar)
  - Carga dinámica de catálogos desde la API
  - Manejo de errores con diferenciación de códigos HTTP
  - Documentación de funcionalidades en el README
