from models.contact_model import Contact
from extensions import db

def create_contact(data):
    contact = Contact(**data) #desempaca el diccionario
    db.session.add(contact)
    db.session.commit()
    return contact

#Buscar por id
def get_contact_by_id(id):
    return Contact.query.get(id)

#Traer todos los contactos
def get_all_contacts():
    return Contact.query.all()

#actualizar contacto
def update_contact(contact, data):
    for key, value in data.items():
        setattr(contact, key,value)
    db.session.commit()
    return contact

#eliminar contacto
def delete_contact(contact):
    db.session.delete(contact)
    db.session.commit()