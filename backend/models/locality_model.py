from extensions import db

class Locality(db.Model):
    __tablename__ = "localities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    province = db.Column(db.String(200))

    contacts = db.relationship("Contact",back_populates="locality" ,lazy=True)