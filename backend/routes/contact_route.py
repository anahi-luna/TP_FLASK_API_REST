from flask import Blueprint
from controllers.contact_controller import *

contact_bp = Blueprint('contact_bp', __name__)

contact_bp.route('/contact',methods = ['POST'])(add_contact)
contact_bp.route('/contact', methods = ['GET'])(get_contacts)
contact_bp.route('/contact/<int:id>', methods = ['GET'])(get_contact)
contact_bp.route('/contact/<int:id>', methods = ['PUT'])(update_contact_controller)
contact_bp.route('/contact/<int:id>', methods = ['DELETE'])(delete_contact_controller)