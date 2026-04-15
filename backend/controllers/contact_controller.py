from flask import request, jsonify
from services.contact_service import * #me trae todas los defs de contact_service
from schemas.contact_schema import contact_schema,contacts_schema

#Agregar un contacto 
def add_contact():
    contact = create_contact(request.json) #recibe la peticion
    result = contact_schema.dump(contact) #retorno en formato json
    return {  
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

def get_contact(id):
    contact = get_contact_by_id(id)
    if not contact:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Contacto no encontrado"
        },404
    result = contact_schema.dump(contact)
    return {
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

def get_contacts():
    contacts = get_all_contacts()
    if not contacts:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"No se cargaron datos"
        },404
    count = len(contacts)
    result = contacts_schema.dump(contacts)
    return {
        "ok":True,
        "data":[result],
        "count":count,
        "message":""
    }

def update_contact_controller(id):
    contact = get_contact_by_id(id)
    if not contact:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Contacto no encontrado"
        },404
    
    updated = update_contact(contact, request.json)
    result = contact_schema.dump(updated)
    return {
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

def delete_contact_controller(id):
    contact= get_contact_by_id(id)
    if not contact:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Contacto no encontrado"
        },404
    delete_contact(contact)
    return {
        "ok":True,
        "data":[],
        "count":0,
        "message":"Se elimino correctamente"
    }
    