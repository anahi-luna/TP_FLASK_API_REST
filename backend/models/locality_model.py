from extensions import db

class Locality(db.Model):
    __tablename__ = "localities" #nombre de la tabla

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200),nullable=False)
    province = db.Column(db.String(200),nullable=False)

# Relacion con contacto
    contacts = db.relationship(
        "Contact", # Nombre del otro modelo relacionado
        back_populates="locality" , # Se conecta con el atributo 'locality' en Contact
        lazy=True) # Carga los datos cuando se necesitan (no inmediatamente)