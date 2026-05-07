from models.contact_model import Contact
from models.locality_model import Locality
#Funcion que devuele la cantidad total de contactos y localidades 
# Para el renderizado en home de frontend
def get_stats():
    contacts_count = Contact.query.count()
    localities_count = Locality.query.count()

    return {
        "ok": True,
        "data": [
            {
                "total_contactos": contacts_count,
                "total_localidades": localities_count
            }
        ],
        "count": 1,
        "message": ""
    },200