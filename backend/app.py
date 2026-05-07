from flask import Flask
from extensions import db,ma  # SQLAlchemy / Marshmallow inicializados en otro archivo
from routes.contact_route import contact_bp # Blueprint de contactos (grupo de rutas)
from routes.locality_route import locality_bp # Blueprint de localidades
from routes.stats_route import stats_bp
import os

#Inicializar app 
app = Flask(__name__)

from flask_cors import CORS #Importamos flask_cors
#Configuración generica de cors
CORS(app)


#Obtener la ruta base del proyecto (carpeta backend)
basedir = os.path.abspath(os.path.dirname(__file__)) 

#Configuracion de la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+ os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #Asi evita q se queja la consola



# INICIALIZAR EXTENSIONES
# Vincula SQLAlchemy y Marshmallow con la app
db.init_app(app)
ma.init_app(app)

# REGISTRAR BLUEPRINTS
# Agrega las rutas de cada módulo (contactos, localidades y stats)
app.register_blueprint(contact_bp, url_prefix ="/api/contactos" ) 
app.register_blueprint(locality_bp, url_prefix ="/api/localidades" )
app.register_blueprint(stats_bp, url_prefix="/api")

#Ruta de prueba
@app.route('/')
def hello():
    return f"Holaaa"

#Corremos el servidor
if __name__ == "__main__":
    with app.app_context():
        db.create_all()# Crea la base de datos y tablas
    app.run(debug=True, host="0.0.0.0",port=5000)
    # host="0.0.0.0" permite acceso desde otros dispositivos/red (Docker/red local)