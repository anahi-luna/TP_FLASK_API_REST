from flask import request, jsonify
from services.contact_service import * #me trae todas las funciones de service_contact
from schemas.contact_schema import contact_schema,contacts_schema #Esquemas para convertir JSON

#Agregar un contacto 
def add_contact():
    contact = create_contact(request.json) #recibe la peticion
    result = contact_schema.dump(contact) #retorno en formato json
    return {  
        "ok":True,
        "data":[result], # Devuelve en lista
        "count":1,
        "message":""
    }

#Obtener contacto por ID
def get_contact(id):
    contact = get_contact_by_id(id) # Busca en la DB usando una funcion de service
    if not contact: #Si no existe el contacto retorna una lista vacia en data 
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Contacto no encontrado"
        },404
    result = contact_schema.dump(contact) # Convierte objeto → diccionario (JSON)
    return {
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

#Trae todos los contactos
def get_contacts():
    contacts = get_all_contacts()  # Trae todos desde la DB
    if not contacts:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"No se cargaron datos"
        },404
    count = len(contacts) # Cantidad de registros
    result = contacts_schema.dump(contacts) # Lista de objetos → JSON
    return {
        "ok":True,
        "data":[result],
        "count":count,
        "message":""
    }

#Actualizar contacto
def update_contact_controller(id):
    contact = get_contact_by_id(id)
    if not contact:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Contacto no encontrado"
        },404
    
    updated = update_contact(contact, request.json) # request.json = datos nuevos que vienen del cliente
    result = contact_schema.dump(updated)
    return {
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

#Eliminar un contacto
def delete_contact_controller(id):
    contact= get_contact_by_id(id)
    if not contact:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Contacto no encontrado"
        },404
    delete_contact(contact) # Elimina en la DB con la funcion delete de service
    return {
        "ok":True,
        "data":[],
        "count":0,
        "message":"Se elimino correctamente"
    }
    