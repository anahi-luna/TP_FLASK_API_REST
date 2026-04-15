from extensions import db # Instancia de SQLAlchemy (maneja la DB)
from models.locality_model import Locality

#crea una localidad
def create_locality(data):
    locality = Locality(**data)
    db.session.add(locality) # Agrega a la sesión (pendiente de guardar)
    db.session.commit()  # Guarda en la base de datos
    return locality  # Devuelve el objeto creado

#Trae localidad por id
def get_locality_by_id(id):
    return Locality.query.get(id) # Busca en la DB por clave primaria

#Trae toda la lista
def get_all_localities():
    return Locality.query.all() 

#Actualiza localidad
def update_locality(locality,data):
     # Recorre el JSON recibido
    for key,value in data.items():
        setattr(locality,key,value)
        # setattr = asigna dinámicamente (ej: locality.name = "nuevo valor")
    db.session.commit() # Guarda cambios en la DB
    return locality  # Devuelve el objeto actualizado

#Elimina localidad
def delete_locality(locality):
    db.session.delete(locality) # Marca para eliminar
    db.session.commit() # Ejecuta eliminación en la DB
