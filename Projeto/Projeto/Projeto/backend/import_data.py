from pymongo import MongoClient
import json

client = MongoClient(
    'mongodb+srv://palhotex_db_user:Xmn0a0gGdUzuLuBh@clustercloud.xzjyxic.mongodb.net/?appName=ClusterCloud',
    tls=True,
    tlsAllowInvalidCertificates=True
)

db = client["jogos_db"]

# Ler o db.json
with open('../frontend/db.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

games = data["games"]

# Limpar a coleção e inserir os jogos
db.games.drop()
db.games.insert_many(games)

print(f"{len(games)} jogos importados com sucesso!")
