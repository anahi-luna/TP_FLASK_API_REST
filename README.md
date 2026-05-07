# 📦 TP Integrador - Agenda de Contactos Fullstack

Aplicación Fullstack desarrollada con:

- ⚛️ Frontend en React + Vite + TailwindCSS
- 🐍 Backend en Flask
- 🗄️ Base de datos SQLite
- 🐳 Docker + Docker Compose

Permite gestionar contactos y localidades mediante una API REST y una interfaz web moderna.

---

# 🚀 Tecnologías utilizadas

## Frontend

- React
- Vite
- TailwindCSS
- React Router
- Context API

## Backend

- Python 3.12
- Flask
- SQLAlchemy
- Marshmallow
- SQLite

## DevOps

- Docker
- Docker Compose
- Nginx

---

# 🧠 Características principales

✔ CRUD completo de Contactos y Localidades  
✔ Arquitectura en capas (Routes + Controllers + Services)  
✔ Validaciones frontend y backend  
✔ Filtros dinámicos por nombre, apellido y localidad  
✔ Relaciones entre entidades (Foreign Key)  
✔ Manejo centralizado de errores  
✔ Normalización automática de datos en MAYÚSCULAS  
✔ Email único validado por base de datos  
✔ Diseño responsive  
✔ Contenerización completa con Docker  

---

# 📁 Estructura del proyecto

```bash
tp_integral/
│
├── backend/
├── frontend/
├── deploy/
├── docs/
├── README.md
└── .gitignore
```

---

# 🐳 Ejecución con Docker

## 1. Clonar repositorio

```bash
git clone https://github.com/anahi-luna/TP_FLASK_API_REST.git
cd TP_FLASK_API_REST
```

---

## 2. Levantar contenedores

Desde la carpeta `deploy/`:

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
http://localhost:5000/api
```

---

# 🗄️ Base de Datos

- Motor: SQLite
- Archivo:

```bash
backend/db.sqlite
```

La base se crea automáticamente al iniciar el backend.

---

# 📍 Endpoints principales

# 🔹 Localidades

## Obtener localidades

```http
GET /api/localidades/
```

## Obtener localidad por ID

```http
GET /api/localidades/1
```

## Crear localidad

```http
POST /api/localidades/
```

Body:

```json
{
  "nombre": "BAHIA BLANCA",
  "provincia": "BUENOS AIRES"
}
```

## Actualizar localidad

```http
PUT /api/localidades/1
```

Body:

```json
{
  "nombre": "Lomas de Zamora",
  "provincia": "Buenos Aires"
}
```

---

## Eliminar localidad

```http
DELETE /api/localidades/5
```

---

# 🔹 Contactos

## Obtener contactos

```http
GET /api/contactos/
```

## Filtrar contactos

### Por nombre

```http
GET /api/contactos/?nombre=ana
```

### Por apellido

```http
GET /api/contactos/?apellido=gonzalez
```

### Por localidad

```http
GET /api/contactos/?id_localidad=1
```

---

## Crear contacto

```http
POST /api/contactos/
```

Body:

```json
{
  "nombre": "ANABELLA",
  "apellido": "GONZALEZ",
  "direccion": "AV. SAN MARTÍN 123",
  "email": "ANABELLA.GONZALEZ@GMAIL.COM",
  "telefono": "+54 351 4567890",
  "id_localidad": 1
}
```

---

# ✅ Datos precargados

## Localidades

- BAHIA BLANCA
- ROSARIO
- LA PLATA
- MENDOZA
- SALTA

## Contactos

- ANABELLA GONZALEZ
- LUCAS FERNANDEZ
- CAMILA MARTINEZ

---

# ⚙️ Validaciones implementadas

## Backend (Marshmallow)

- Nombre → Solo letras
- Apellido → Solo letras
- Provincia → Solo letras
- Email → Formato válido
- Email único
- Teléfono → Regex
- Localidad obligatoria

## Frontend (React)

- Validación en tiempo real
- Mensajes de error amigables
- Formularios controlados

---

# 🧠 Arquitectura Backend

El backend sigue arquitectura en capas:

- Routes → Endpoints
- Controllers → Request / Response
- Services → Lógica de negocio
- Models → Base de datos
- Schemas → Validaciones y serialización

---

# 🐳 Docker

El proyecto incluye:

- Contenedor para backend Flask
- Contenedor para frontend React
- Docker Compose para orquestación

---

# ✅ Conclusión

Este proyecto implementa una aplicación Fullstack moderna aplicando:

- Arquitectura escalable
- Buenas prácticas de desarrollo
- Validaciones robustas
- Integración frontend/backend
- Contenerización completa con Docker
- Diseño responsive y experiencia de usuario moderna