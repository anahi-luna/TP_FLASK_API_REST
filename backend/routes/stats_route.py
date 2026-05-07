from flask import Blueprint
from controllers.stats_controller import get_stats

#Creamos el bluprint de stats
stats_bp = Blueprint('stats_bp', __name__)

#GET Obtiene la cantidad total de contacts y localities
stats_bp.route('/stats', methods=['GET'])(get_stats)

