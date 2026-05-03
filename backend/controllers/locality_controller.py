from flask import request, jsonify
from services.locality_service import * #trae las funciones de service locality
from schemas.locality_schema import locality_schema, localities_schema #Esquemas para convertir JSON
from marshmallow import ValidationError
from exceptions import BusinessError

#Agregar localidad
def add_locality():
    try:
        data = locality_schema.load(request.json)
        locality = create_locality(data)
        result= locality_schema.dump(locality)
        return {  
            "ok":True,
            "data":[result],
            "count":1,
            "message":""
        },201
    except ValidationError as err:
        return {
            "ok": False,
            "data": [],
            "count": 0,
            "message": err.messages
        }, 400

#Obtener localidad por ID
def get_locality(id):
    locality =get_locality_by_id(id)
    if not locality:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Localidad no encontrada"
        },404
    result= locality_schema.dump(locality)
    return {
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

#Trae todos los localidades
def get_localities():
    localities = get_all_localities()
    if not localities:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"No hay localidades cargadas"
        },404
    count = len(localities)
    result= localities_schema.dump(localities)
    return {
        "ok":True,
        "data":result,
        "count":count,
        "message":""
    }

#Actualizar localidad
def update_locality_controller(id):
    locality = get_locality_by_id(id)
    if not locality:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Localidad no encontrada"
        },404
    
    try:
        data = locality_schema.load(request.json,partial = True)
        updated = update_locality(locality, data)
        result= locality_schema.dump(updated)
        return {
            "ok":True,
            "data":[result],
            "count":1,
            "message":""
        }
    except ValidationError as err:
        return {
            "ok": False,
            "data": [],
            "count": 0,
            "message": err.messages
        }, 400    

#Eliminar un localidad
def delete_locality_controller(id):
    locality = get_locality_by_id(id)
    if not locality:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Localidad no encontrada"
        },404
    try:
        delete_locality(locality)
        
        return {
            "ok":True,
            "data":[],
            "count":0,
            "message":"Se eliminó correctamente"
        },200
    except BusinessError as e:
        return {
            "ok": False,
            "data": [],
            "count": 0,
            "message": e.message
        }, e.status_code