from marshmallow import fields,validate
from extensions import ma
from models.locality_model import Locality

class LocalitySchema(ma.SQLAlchemyAutoSchema):
    name = fields.String(
        required=True,
        validate=validate.Regexp(
            r'^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$',
            error="El nombre solo puede contener letras"
        ),
        error_messages={
            "required": "El nombre es obligatorio"
        }
    )

    province = fields.String(
        required=True,
        validate=validate.Regexp(
            r'^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$',
            error="La provincia solo puede contener letras"
        ),
        error_messages={
            "required": "La provincia es obligatoria"
        }
    )
    class Meta:
        model = Locality
        load_instance = False

locality_schema = LocalitySchema()
localities_schema = LocalitySchema(many=True)