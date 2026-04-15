# 📦 TP Integrador - API REST con Flask

Este proyecto consiste en una API REST desarrollada con Flask, utilizando:

* SQLAlchemy (Base de datos)
* Marshmallow (Serialización)
* SQLite (Base de datos local)
* Docker (Contenerización)

---

# 🚀 Cómo ejecutar el proyecto con Docker

## 1. Clonar el repositorio

```bash
git clone https://github.com/anahi-luna/TP_FLASK_API_REST.git
cd tp-integral
```

---

## 2. Levantar el contenedor

Desde la carpeta `/deploy` ejecutar:

```bash
docker-compose up --build
```

👉 Esto:

* Construye la imagen
* Levanta el contenedor
* Ejecuta la API

---

## 3. Verificar funcionamiento

Abrir en navegador:

```
http://localhost:5000/
```

Debería mostrar:

```
Holaaa
```

---

# 🧪 Pruebas con Postman

## 📍 LOCALITY

---

### 🔹 POST (crear localidad)

```
http://localhost:5000/locality
```

Body:

```json
{
  "name": "buenos aires",
  "province": "buenos aires"
}
```

---

### 🔹 GET (listar localidades)

```
http://127.0.0.1:5000/locality
```

---

### 🔹 GET (Buscar una localidad)

```
http://127.0.0.1:5000/locality/1
```

---

### 🔹 PUT (actualizar localidad)

```
http://localhost:5000/locality/1
```

Body:

```json
{
  "name": "La Plata",
  "province": "Buenos Aires"
}
```

---

### 🔹 DELETE (eliminar localidad)

```
http://127.0.0.1:5000/locality/1
```

---

## 📍 CONTACT

---

### 🔹 POST (crear contacto)

```
http://localhost:5000/contact
```

Body:

```json
{
  "name": "Anabela",
  "last_name": "Gomez",
  "address": "Calle falsa 654",
  "email": "anabela@email.com",
  "phone": "111-222-333",
  "locality_id": 1
}
```

---

### 🔹 GET (listar contactos)

```
http://127.0.0.1:5000/contact
```

---

### 🔹 GET (Buscar un contacto)

```
http://127.0.0.1:5000/contact/1
```

---

### 🔹 PUT (actualizar contacto)

```
http://127.0.0.1:5000/contact/1
```

Body:

```json
{
  "name": "Cecilia",
  "last_name": "Perez",
  "address": "Calle verdadera 456",
  "email": "cecilia@email.com",
  "phone": "333-444-555",
  "locality_id": 1
}
```

---

### 🔹 DELETE (eliminar contacto)

```
http://127.0.0.1:5000/contact/1
```

---

# 🧠 Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas:

* **Routes** → define endpoints
* **Controllers** → maneja request/response
* **Services** → lógica de negocio
* **Models** → estructura de datos (DB)
* **Schemas** → serialización (JSON)

---

# 🗄️ Base de Datos

* Tipo: SQLite
* Archivo: `backend/db.sqlite`
* Se crea automáticamente al iniciar la app

---

# 🐳 Docker

Se utiliza Docker para:

* Estandarizar el entorno
* Facilitar ejecución en cualquier máquina
* Evitar problemas de dependencias

---

# ✅ Tecnologías utilizadas

* Python 3.12
* Flask
* SQLAlchemy
* Marshmallow
* SQLite
* Docker

---

