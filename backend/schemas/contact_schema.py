from extensions import ma
from models.contact_model import Contact
from schemas.locality_schema import LocalitySchema

class ContactSchema(ma.SQLAlchemyAutoSchema):
    locality = ma.Nested(LocalitySchema)
    class Meta:
        model = Contact
        load_instance = True

contact_schema = ContactSchema()
contacts_schema = ContactSchema(many=True)