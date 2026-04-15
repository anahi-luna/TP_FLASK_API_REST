from flask import Blueprint # Permite agrupar rutas
from controllers.contact_controller import *  # Importa las funciones del controller

#Crea el blueprint
contact_bp = Blueprint('contact_bp', __name__)
# 'contact_bp' = nombre interno del blueprint
# __name__ = referencia del módulo actual

#POST Crear contacto
contact_bp.route('/contact',methods = ['POST'])(add_contact)# Cuando llega un POST a /contact → ejecuta add_contact
#GET Obtener lista
contact_bp.route('/contact', methods = ['GET'])(get_contacts) # GET /contact → devuelve lista de contactos
#GET Obtener por id
contact_bp.route('/contact/<int:id>', methods = ['GET'])(get_contact)# <int:id> = parámetro dinámico (ej: /contact/1)
#PUT Actualizar por id
contact_bp.route('/contact/<int:id>', methods = ['PUT'])(update_contact_controller) # PUT /contact/1 → actualiza el contacto con id=1
#DELETE Eliminar por id
contact_bp.route('/contact/<int:id>', methods = ['DELETE'])(delete_contact_controller) # DELETE /contact/1 → elimina el contacto