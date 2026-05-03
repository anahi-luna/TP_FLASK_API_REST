from models.contact_model import Contact
from extensions import db
from services.utils import normalize_data
from models.locality_model import Locality
from sqlalchemy.exc import IntegrityError
from exceptions import BusinessError

def create_contact(data):
    locality = Locality.query.get(data["locality_id"])
    if not locality:
        raise BusinessError("La localidad no existe", 404)
    

    resp = normalize_data(data)
    contact = Contact(**resp) #desempaca el diccionario
    db.session.add(contact)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise BusinessError("El email ya está registrado", 409)
    return contact

#Buscar por id
def get_contact_by_id(id):
    return Contact.query.get(id)

#Traer todos los contactos
def get_all_contacts():
    return Contact.query.all()

#actualizar contacto
def update_contact(contact, data):
    # validar si cambia locality
    if "locality_id" in data:
        locality = Locality.query.get(data["locality_id"])
        if not locality:
            raise BusinessError("La localidad no existe", 404)

    resp = normalize_data(data)

    for key, value in resp.items():
        setattr(contact, key,value)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise BusinessError("El email ya está registrado", 409)   
     
    return contact

#eliminar contacto
def delete_contact(contact):
    db.session.delete(contact)
    db.session.commit()