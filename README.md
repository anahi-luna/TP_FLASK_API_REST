# 📦 TP Integrador - API REST con Flask

API REST desarrollada con Flask que permite gestionar **Contactos y Localidades**, aplicando validaciones, relaciones y reglas de negocio.

---

# 🚀 Tecnologías utilizadas

- Python 3.12  
- Flask  
- SQLAlchemy (ORM)  
- Marshmallow (serialización y validación)  
- SQLite (base de datos)  
- Docker  

---

# 🧠 Características principales

✔ Arquitectura en capas (Blueprints + Services + Controllers)  
✔ CRUD completo para Contactos y Localidades  
✔ Relación entre entidades (Foreign Key obligatoria)  
✔ Validaciones con Marshmallow  
✔ Uso de Regex para campos (nombre, teléfono, etc.)  
✔ Normalización de datos (todos los textos en MAYÚSCULAS)  
✔ Email único (controlado con integridad de base de datos)  
✔ Manejo de errores con mensajes en español  
✔ Códigos HTTP correctos  
✔ Protección de integridad (no se puede eliminar una localidad con contactos)  
✔ Contenerización con Docker  

---

# 🚀 Cómo ejecutar el proyecto con Docker

## 1. Clonar el repositorio

```bash
git clone https://github.com/anahi-luna/TP_FLASK_API_REST.git
cd TP_FLASK_API_REST
```

---

## 2. Levantar el contenedor

Desde la carpeta `/deploy` ejecutar:

```bash
docker-compose up --build
```

---

## 3. Verificar funcionamiento

Abrir en navegador:

```
http://localhost:5000/
```

Respuesta esperada:

```
Holaaa
```

---

# 🗄️ Base de Datos

- Tipo: SQLite  
- Archivo: `backend/db.sqlite`  
- Se crea automáticamente al iniciar la aplicación  

---

# 🧪 Pruebas con Postman

---

# 📍 LOCALITY

## 🔹 POST - Crear localidad

```
POST http://localhost:5000/locality
```

Body válido:

```json
{
  "name": "Buenos Aires",
  "province": "Buenos Aires"
}
```

---

## ❌ Ejemplo de error de validación

```json
{
  "name": "1234",
  "province": "5678"
}
```

Respuesta:

```json
{
  "ok": false,
  "message": {
    "name": ["El nombre solo puede contener letras"],
    "province": ["La provincia solo puede contener letras"]
  }
}
```

---

## 🔹 GET - Listar localidades

```
GET http://localhost:5000/locality
```

---

## 🔹 GET - Obtener por ID

```
GET http://localhost:5000/locality/1
```

---

## 🔹 PUT - Actualizar localidad

```
PUT http://localhost:5000/locality/1
```

Body:

```json
{
  "name": "La Plata"
}
```

---

## 🔹 DELETE - Eliminar localidad

```
DELETE http://localhost:5000/locality/1
```

❗ Restricción:

Si tiene contactos asociados:

```json
{
  "ok": false,
  "message": "No se puede eliminar: tiene contactos asociados"
}
```

---

# 📍 CONTACT

## 🔹 POST - Crear contacto

```
POST http://localhost:5000/contact
```

Body válido:

```json
{
  "name": "Ana",
  "last_name": "Gomez",
  "address": "Calle 123",
  "email": "ana@email.com",
  "phone": "123456789",
  "locality_id": 1
}
```

---

## ❌ Ejemplo de error (email inválido)

```json
{
  "email": "correo-invalido"
}
```

Respuesta:

```json
{
  "ok": false,
  "message": {
    "email": ["El email no es válido"]
  }
}
```

---

## ❌ Ejemplo de error (email duplicado)

```json
{
  "ok": false,
  "message": "El email ya está registrado"
}
```

---

## ❌ Ejemplo de error (localidad inexistente)

```json
{
  "ok": false,
  "message": "La localidad no existe"
}
```

---

## 🔹 GET - Listar contactos

```
GET http://localhost:5000/contact
```

✔ Incluye localidad anidada:

```json
{
  "name": "ANA",
  "locality": {
    "name": "BUENOS AIRES",
    "province": "BUENOS AIRES"
  }
}
```

---

## 🔹 GET - Obtener por ID

```
GET http://localhost:5000/contact/1
```

---

## 🔹 PUT - Actualizar contacto

```
PUT http://localhost:5000/contact/1
```

Body parcial permitido:

```json
{
  "phone": "987654321"
}
```

---

## 🔹 DELETE - Eliminar contacto

```
DELETE http://localhost:5000/contact/1
```

---

# 🧠 Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas:

- **Routes** → Define endpoints (Blueprints)  
- **Controllers** → Manejo de request/response  
- **Services** → Lógica de negocio  
- **Models** → Definición de la base de datos  
- **Schemas** → Validación y serialización  

---

# ⚙️ Validaciones implementadas

- Nombre y Apellido → Solo letras (Regex)  
- Provincia → Solo letras  
- Email → Formato válido + único  
- Teléfono → Formato válido (Regex)  
- Localidad → Debe existir (FK obligatoria)  

---

# 🐳 Docker

Docker permite:

- Ejecutar el proyecto sin instalar dependencias  
- Mantener un entorno consistente  
- Facilitar despliegue  

---

# ✅ Conclusión

Este proyecto implementa una API REST completa cumpliendo con:

- Buenas prácticas de desarrollo backend  
- Validaciones robustas  
- Manejo de errores controlado  
- Arquitectura escalable  
