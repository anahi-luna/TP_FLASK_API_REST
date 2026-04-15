from flask import Blueprint
from controllers.locality_controller import *

locality_bp = Blueprint('locality_bp', __name__)

locality_bp.route('/locality', methods = ['POST'])(add_locality)
locality_bp.route('/locality', methods = ['GET'])(get_localities)
locality_bp.route('/locality/<int:id>', methods = ['GET'])(get_locality)
locality_bp.route('/locality/<int:id>', methods = ['PUT'])(update_locality_controller)
locality_bp.route('/locality/<int:id>', methods = ['DELETE'])(delete_locality_controller)