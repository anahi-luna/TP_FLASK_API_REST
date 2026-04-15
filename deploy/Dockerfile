# Usa una imagen base oficial de Python
# (ya viene con Python y pip instalados)
FROM python:3.12-slim

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia TODO el contenido de la carpeta backend al contenedor
COPY backend/ .

# Instala las dependencias del archivo requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 5000 (donde corre Flask)
EXPOSE 5000

# Comando que se ejecuta al iniciar el contenedor
CMD [ "python","app.py" ]
# Ejecuta tu aplicación Flask
