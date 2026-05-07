# Informe Grupal — Sistema Fullstack "Libreta de Contactos"

---

## 1. Investigación de Tecnologías y Resolución de CORS

### Investigación
Para resolver cómo integrar Flask con React investigamos principalmente la documentación oficial de cada tecnología:

- **Flask**: Documentación oficial (https://flask.palletsprojects.com) para entender los Blueprints y el manejo de rutas.
- **SQLAlchemy**: Documentación de Flask-SQLAlchemy para los modelos ORM y las relaciones entre tablas.
- **Marshmallow**: Documentación de marshmallow para entender los Schemas, `@pre_load`, y el uso de `validate.Regexp`.
- **React Router v6**: Documentación oficial para el nuevo sistema de rutas con `<Routes>` y `<Route>`.
- **Tailwind CSS**: Documentación oficial para el sistema de clases utilitarias y la configuración del modo oscuro con `darkMode: 'class'`.

### Resolución de CORS
CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad del navegador que bloquea peticiones HTTP entre diferentes orígenes (dominio + puerto). Como el frontend corre en `localhost:5173` y el backend en `localhost:5000`, el navegador bloquea las peticiones por defecto.

**Solución en el backend**: Instalamos `flask-cors` y lo configuramos en el factory de la app:
```python
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

**Solución en desarrollo (Vite proxy)**: Configuramos un proxy en `vite.config.js` que redirige todas las llamadas a `/api` hacia `http://localhost:5000`, evitando el problema de CORS en desarrollo sin tocar el backend.

---

## 2. Herramientas de Desarrollo

| Herramienta | Rol | Motivo de elección |
|---|---|---|
| **VS Code** | IDE principal (frontend y backend) | Extensiones para Python, React, Tailwind CSS IntelliSense, y control de versiones integrado con Git. |
| **Postman** | Testing de la API | Permite crear colecciones de peticiones, testear todos los endpoints y ver respuestas formateadas. |
| **Git + GitHub** | Control de versiones | Para trabajar en paralelo sin pisarse los cambios. Cada integrante trabajó en su propia rama. |
| **Docker Desktop** | Contenedores | Para probar el entorno de producción localmente antes de entregar. |

---

## 3. Uso de Inteligencia Artificial

**Sí usamos IA** (Claude de Anthropic y ChatGPT). El detalle de uso:

| Área | Cómo se usó la IA | Impacto |
|---|---|---|
| **Generación de Regex** | Pedimos patrones para email, teléfono argentino, y campos de texto con tildes y ñ. Luego los revisamos y testeamos manualmente. | Alto: ahorró tiempo y garantizó cobertura de casos borde. |
| **Estructura de Tailwind** | Consultamos cómo estructurar el dark mode con `darkMode: 'class'` y cómo combinar clases responsivas. | Medio: aceleró la curva de aprendizaje de Tailwind. |
| **Resolución de errores** | Pegamos mensajes de error y consultamos cómo solucionarlos (ej. errores de SQLAlchemy con claves foráneas). | Alto: redujo el tiempo de debugging. |
| **Marshmallow `@pre_load`** | Consultamos cómo convertir a mayúsculas antes de validar sin romper la validación. | Alto: era un concepto nuevo que no conocíamos. |

**Impacto general**: Estimamos que el uso de IA redujo el tiempo de desarrollo en un 30-40%, principalmente en debugging y en la generación de boilerplate. Sin embargo, cada bloque de código generado fue revisado, comprendido y adaptado al proyecto.

---

## 4. Extras Implementados

- **Persistencia del modo oscuro**: La preferencia del usuario se guarda en `localStorage` y se respeta entre sesiones.
- **Preferencia del sistema**: Al primer ingreso, si el usuario tiene su sistema operativo en modo oscuro, la app lo detecta automáticamente mediante `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Proxy de Vite**: Configurado para simplificar el desarrollo sin necesidad de configurar CORS manualmente en cada cambio.
- **Vista responsiva con cards en móvil**: En pantallas pequeñas, la tabla de contactos se convierte en tarjetas para mejor usabilidad.
- **Toasts con cierre por clic**: Además del auto-cierre a los 4 segundos, el usuario puede cerrar un toast haciendo clic.
- **Cierre de modal con Escape y clic en fondo**: Mejor experiencia de usuario.

---

## 5. Guía de Uso del Servicio (API)

# 🐳 Ejecución con Docker

## 1. Clonar el repositorio

```bash
git clone https://github.com/anahi-luna/TP_FLASK_API_REST.git
cd TP_FLASK_API_REST
```

---

## 2. Levantar contenedores

Desde la carpeta `deploy/` ejecutar:

```bash
docker-compose up --build
```

---

# 🌐 Acceso a la aplicación

## Frontend

```bash
http://localhost:5173/
```

## Backend API

```bash
http://localhost:5000/
```

---

### Endpoints de Localidades

#### GET — Listar todas las localidades
```bash
curl -X GET http://localhost:5000/api/localidades/
```

#### GET — Filtrar por nombre y provincia
```bash
curl -X GET "http://localhost:5000/api/localidades/?nombre=buenos&provincia=buenos"
```

#### GET — Obtener una localidad por ID
```bash
curl -X GET http://localhost:5000/api/localidades/1
```

#### POST — Crear una localidad
```bash
curl -X POST http://localhost:5000/api/localidades/ \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Mar del Plata", "provincia": "Buenos Aires"}'
```

#### PUT — Actualizar una localidad
```bash
curl -X PUT http://localhost:5000/api/localidades/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Mar del Plata", "provincia": "Buenos Aires"}'
```

#### DELETE — Eliminar una localidad
```bash
curl -X DELETE http://localhost:5000/api/localidades/1
```
> ⚠️ Retorna HTTP 409 si la localidad tiene contactos asociados.

---

### Endpoints de Contactos

#### GET — Listar todos los contactos (con localidad anidada)
```bash
curl -X GET http://localhost:5000/api/contactos/
```

#### GET — Filtrar contactos
```bash
curl -X GET "http://localhost:5000/api/contactos/?nombre=juan&apellido=perez&id_localidad=1"
```

#### POST — Crear un contacto
```bash
curl -X POST http://localhost:5000/api/contactos/ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "direccion": "Av. Corrientes 1234",
    "email": "juan.perez@email.com",
    "telefono": "+54 9 11 1234-5678",
    "id_localidad": 1
  }'
```

#### PUT — Actualizar un contacto
```bash
curl -X PUT http://localhost:5000/api/contactos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellido": "Pérez",
    "direccion": "Av. Rivadavia 500",
    "email": "juan.perez@email.com",
    "telefono": "+54 9 11 1234-5678",
    "id_localidad": 1
  }'
```

#### DELETE — Eliminar un contacto
```bash
curl -X DELETE http://localhost:5000/api/contactos/1
```

---

### Formato de Respuesta Estándar

Todas las respuestas siguen este formato JSON:
```json
{
  "ok": true,
  "data": [{ "id": 1, "nombre": "JUAN", "apellido": "PÉREZ", "..." : "..." }],
  "count": 1,
  "message": "Contacto creado exitosamente."
}
```

En caso de error:
```json
{
  "ok": false,
  "data": [],
  "count": 0,
  "message": "El email 'juan@email.com' ya está registrado."
}
```

---

## 6. Análisis de Escalabilidad (1.000.000 de contactos)

Con un millón de contactos, el sistema actual presentaría los siguientes cuellos de botella y sus soluciones:

### Backend

| Problema | Solución |
|---|---|
| **SQLite no escala bien** | Migrar a **PostgreSQL** o **MySQL**, que soportan concurrencia real y grandes volúmenes con índices optimizados. |
| **Queries sin índices** | Agregar índices en los campos de búsqueda frecuente: `nombre`, `apellido`, `email`, `id_localidad`. |
| **Paginación ausente** | Implementar paginación en todos los endpoints GET: `?page=1&per_page=50`. Actualmente se devuelven todos los registros. |
| **Búsqueda por LIKE ineficiente** | Para búsqueda de texto libre usar **Full-Text Search** (PostgreSQL) o un motor como **Elasticsearch**. |
| **Sin caché** | Agregar **Redis** para cachear respuestas de búsquedas frecuentes y las estadísticas del Home. |

### Frontend

| Problema | Solución |
|---|---|
| **Renderizar 1M de filas** | Implementar **virtualización** con `react-window` o `TanStack Virtual`, que solo renderiza las filas visibles. |
| **Búsqueda en tiempo real pesada** | Agregar **debounce** (retraso de 300-500ms) en los filtros para no disparar una petición por cada tecla. |
| **Estado de la UI complejo** | Reemplazar `useState` local por **React Query / TanStack Query** para manejo de caché, paginación e invalidación automática. |
