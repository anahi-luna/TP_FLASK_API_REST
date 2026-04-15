from extensions import ma
from models.locality_model import Locality

class LocalitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Locality
        load_instance = True

locality_schema = LocalitySchema()
localities_schema = LocalitySchema(many=True)