import pymongo

# Configuration de l'adresse IP et du port MongoDB
host = "127.0.0.1"
port = 27017

# Connexion à la base de données MongoDB
try:
    client = pymongo.MongoClient(host, port)
    print("Connecté à MongoDB sur {}:{}.".format(host, port))

    # Si vous avez besoin d'accéder à une base de données spécifique, vous pouvez le faire comme suit :
    # db = client["nom_de_la_base_de_donnees"]

    # Si vous avez besoin d'accéder à une collection spécifique, vous pouvez le faire comme suit :
    # collection = db["nom_de_la_collection"]

    # Utilisez la connexion client pour interagir avec la base de données MongoDB
    # Par exemple, vous pouvez insérer des données, effectuer des requêtes, etc.

    # Ne pas oublier de fermer la connexion lorsque vous avez terminé
    # client.close()

except pymongo.errors.ConnectionFailure as e:
    print("Erreur de connexion à MongoDB : ", e)