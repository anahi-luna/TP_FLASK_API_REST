from flask import Flask
from extensions import db,ma
from routes.contact_route import contact_bp
from routes.locality_route import locality_bp
import os

#Inicializar app
app = Flask(__name__)

#Directorio base
basedir = os.path.abspath(os.path.dirname(__file__)) 

#Configuracion de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+ os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #Asi evita q se queja la consola


db.init_app(app)
ma.init_app(app)

app.register_blueprint(contact_bp)
app.register_blueprint(locality_bp)


#Corremos el servidor
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)