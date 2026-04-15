from flask import request, jsonify
from services.locality_service import *
from schemas.locality_schema import locality_schema, localities_schema

def add_locality():
    locality = create_locality(request.json)
    result= locality_schema.dump(locality)
    return {  
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

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

def get_localities():
    localities = get_all_localities()
    if not localities:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"No se cargaron datos"
        },404
    count = len(localities)
    result= localities_schema.dump(localities)
    return {
        "ok":True,
        "data":[result],
        "count":count,
        "message":""
    }

def update_locality_controller(id):
    locality = get_locality_by_id(id)
    if not locality:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Localidad no encontrada"
        },404
    updated = update_locality(locality, request.json)
    result= locality_schema.dump(updated)
    return {
        "ok":True,
        "data":[result],
        "count":1,
        "message":""
    }

def delete_locality_controller(id):
    locality = get_locality_by_id(id)
    if not locality:
        return{
            "ok":False,
            "data":[],
            "count":0,
            "message":"Localidad no encontrada"
        },404
    delete_locality(locality)
    return {
        "ok":True,
        "data":[],
        "count":0,
        "message":"Se elimino correctamente"
    }