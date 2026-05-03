from flask import Blueprint
from controllers.locality_controller import *

#Crea el blueprint
locality_bp = Blueprint('locality_bp', __name__)

#POST Crear localidad
locality_bp.route('/locality/', methods = ['POST'])(add_locality)
#GET Obtener lista
locality_bp.route('/locality', methods = ['GET'])(get_localities)
#GET Obtener por id
locality_bp.route('/locality/<int:id>', methods = ['GET'])(get_locality)
#PUT Actualizar por id
locality_bp.route('/locality/<int:id>', methods = ['PUT'])(update_locality_controller)
#DELETE Eliminar por id
locality_bp.route('/locality/<int:id>', methods = ['DELETE'])(delete_locality_controller)