from extensions import db
from models.locality_model import Locality

def create_locality(data):
    locality = Locality(**data)
    db.session.add(locality)
    db.session.commit()
    return locality

def get_locality_by_id(id):
    return Locality.query.get(id)

def get_all_localities():
    return Locality.query.all()

def update_locality(locality,data):
    for key,value in data.items():
        setattr(locality,key,value)
    db.session.commit()
    return locality

def delete_locality(locality):
    db.session.delete(locality)
    db.session.commit()
