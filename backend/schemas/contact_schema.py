from marshmallow import fields, validate
from extensions import ma # Instancia de Marshmallow (serialización)
from models.contact_model import Contact #Trae el modelo contact
from schemas.locality_schema import LocalitySchema # Schema de Locality para la relacion

class ContactSchema(ma.SQLAlchemyAutoSchema):
    #Se modifica los nombres de los campos para la compatibildad con el frontend
    nombre= fields.String(
        attribute="name", #Hace referencia al atributo del modelo contact 
        required=True,
        validate=validate.Regexp(
            r'^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$',
            error="El nombre solo puede contener letras"
        )
    )
    apellido = fields.String(
        attribute="last_name",
        required=True,
        validate=validate.Regexp(
            r'^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$',
            error="El Apellido solo puede contener letras"
        )
    )

    email = fields.Email(
        required=True,
        error_messages={
            "required": "El email es obligatorio",
            "invalid": "El email no es válido"
        })

    telefono = fields.String(
        attribute="phone",
        required=True,
        validate=validate.Regexp(
            r'^\+?[0-9\s\-]{7,15}$',
            error="El teléfono no es válido"
        )
    )

    direccion = fields.String(
        attribute="address",
        required=True
    )

    id_localidad = fields.Integer(
        attribute="locality_id",
        required=True)
    
    localidad = ma.Nested(
         LocalitySchema,
         attribute="locality",
    ) 
    # Relación anidada (Nested)
    # Incluye los datos de la localidad dentro del contacto
    # Ej: un contacto devuelve también su localidad asociada

    class Meta:
        model = Contact # Usa el modelo Contact como base
        load_instance = False # Permite convertir JSON → objeto
        exclude = ("name", "last_name", "phone", "address", "locality_id", "locality") 
        #Excluye los campos generados automaticamente por SQLAlchemyAutoSchema 

# INSTANCIAS DEL SCHEMA
contact_schema = ContactSchema()  # Para un solo contacto
contacts_schema = ContactSchema(many=True) # Para lista de contactos