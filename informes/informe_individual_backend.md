# Informe Individual — Integrante Backend

**Nombre**: Rebeca Anahi Luna Colque 
**Rol**: Backend (Python & Flask)

---

## 1. Desafío Técnico: ¿Qué fue lo que más te costó?

El mayor desafío fue lograr la correcta integración entre el backend desarrollado en Flask y el frontend realizado en React.

Uno de los principales problemas apareció porque los modelos y campos del backend estaban definidos originalmente en inglés `(name, last_name, locality_id)`, mientras que el frontend trabajaba completamente en español `(nombre, apellido, id_localidad)`. Esto generaba errores al renderizar los datos en React y dificultaba el envío correcto de información desde los formularios.

La solución fue utilizar Marshmallow para mapear los nombres de los campos mediante `attribute=""`, permitiendo mantener internamente los modelos en inglés mientras la API respondía y recibía datos en español. Gracias a esto no fue necesario modificar toda la estructura del proyecto ni rehacer la base de datos.

Otro problema importante fue la conexión entre frontend y backend al consumir la API. En algunos endpoints se generaban URLs incorrectas con doble barra `(//)`, lo que impedía obtener correctamente las localidades y contactos desde React. Después de revisar cómo se construían las rutas y cómo se concatenaban los endpoints, pude corregir la estructura de las URLs y lograr que el frontend renderizara correctamente la información.

También tuve que agregar lógica de filtrado en los servicios de contactos y localidades para permitir búsquedas por nombre, apellido y provincia utilizando consultas dinámicas con SQLAlchemy e `ilike().` 

---

## 2. Aprendizaje: Herramienta o concepto nuevo que ahora domino

Durante este trabajo práctico aprendí mejor cómo utilizar `Marshmallow` no solamente para serializar datos, sino también para adaptar estructuras entre frontend y backend.

Antes de este proyecto ya había utilizado `Marshmallow` en trabajos anteriores, pero en este TP comprendí mucho mejor cómo aprovechar herramientas como:

`attribute=""` para mapear nombres de campos,
validaciones con Regex dentro de los `Schemas`,
serialización de relaciones anidadas `(Nested)`,
manejo de respuestas `JSON` consistentes.

También aprendí más sobre la integración entre Flask y React, especialmente cómo estructurar correctamente las rutas de la API, configurar variables de entorno y resolver problemas de comunicación entre ambos sistemas.

Además, incorporé el uso de Docker para levantar frontend y backend de manera unificada mediante docker-compose, lo que facilitó muchísimo las pruebas y la portabilidad del proyecto.
