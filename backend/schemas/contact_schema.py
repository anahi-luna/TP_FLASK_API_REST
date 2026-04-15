from extensions import ma # Instancia de Marshmallow (serialización)
from models.contact_model import Contact #Trae el modelo contact
from schemas.locality_schema import LocalitySchema # Schema de Locality para la relacion

class ContactSchema(ma.SQLAlchemyAutoSchema):
    locality = ma.Nested(LocalitySchema) # Relación anidada (Nested)
    # Incluye los datos de la localidad dentro del contacto
    # Ej: un contacto devuelve también su localidad asociada

    class Meta:
        model = Contact # Usa el modelo Contact como base
        load_instance = True # Permite convertir JSON → objeto

# INSTANCIAS DEL SCHEMA
contact_schema = ContactSchema()  # Para un solo contacto
contacts_schema = ContactSchema(many=True) # Para lista de contactos