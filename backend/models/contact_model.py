from extensions import db

class Contact(db.Model):
    __tablename__ = "contacts"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    address = db.Column(db.String(200))
    email = db.Column(db.String(200), unique=True,nullable=False)
    phone = db.Column(db.String(200), nullable=False)
    #Relacion con localidad por foreignkey en DB
    locality_id = db.Column(db.Integer, db.ForeignKey("localities.id"), nullable=False)
    #Relacion con los modelos en python
    locality = db.relationship("Locality",back_populates="contacts")