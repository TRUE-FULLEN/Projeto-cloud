from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId
import pymongo
import jwt
import datetime

app = Flask(__name__)
CORS(app)

SECRET_KEY = "chave_secreta_projeto_cloud"  


client = MongoClient(
    'mongodb+srv://palhotex_db_user:Xmn0a0gGdUzuLuBh@clustercloud.xzjyxic.mongodb.net/?appName=ClusterCloud',
)
db = client["jogos_db"]


# ─────────────────────────────────────────────
# Helper: converter ObjectId para string
# ─────────────────────────────────────────────
def serialize(doc):
    if doc is None:
        return None
    doc["_id"] = str(doc["_id"])
    return doc




# 1. GET /api/v1/products  –  Lista com paginação (?page=1&limit=10)
@app.route("/api/v1/products", methods=["GET"])
def get_products():
    try:
        page  = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 10))
        skip  = (page - 1) * limit

        products = list(db.games.find().skip(skip).limit(limit))
        products = [serialize(p) for p in products]

        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 2. GET /api/v1/products/<id>  –  Jogo por id
@app.route("/api/v1/products/<int:id>", methods=["GET"])
def get_product(id):
    try:
        product = db.games.find_one({"id": id})
        if product is None:
            return jsonify({"error": "Jogo não encontrado"}), 404
        return jsonify(serialize(product)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 3. POST /api/v1/products  –  Adicionar jogo(s)  [auth required]
@app.route("/api/v1/products", methods=["POST"])
def add_products():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Body inválido"}), 400

        if isinstance(data, list):
            result = db.games.insert_many(data)
            return jsonify({"inserted_ids": [str(i) for i in result.inserted_ids]}), 201
        else:
            result = db.games.insert_one(data)
            return jsonify({"inserted_id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 4. DELETE /api/v1/products/<id>  –  Remover jogo  [auth required]
@app.route("/api/v1/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    try:
        result = db.games.delete_one({"id": id})
        if result.deleted_count == 0:
            return jsonify({"error": "Jogo não encontrado"}), 404
        return jsonify({"message": "Jogo removido com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 5. PUT /api/v1/products/<id>  –  Actualizar jogo  [auth required]
@app.route("/api/v1/products/<int:id>", methods=["PUT"])
def update_product(id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Body inválido"}), 400

        result = db.games.update_one({"id": id}, {"$set": data})
        if result.matched_count == 0:
            return jsonify({"error": "Jogo não encontrado"}), 404
        return jsonify({"message": "Jogo actualizado com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 6. GET /api/v1/products/total  –  Número total de jogos
@app.route("/api/v1/products/total", methods=["GET"])
def get_total_products():
    try:
        total = db.games.count_documents({})
        return jsonify({"total": total}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 7. GET /api/v1/products/categorias/<genre>  –  Por género, com paginação
@app.route("/api/v1/products/categorias/<categoria>", methods=["GET"])
def get_products_by_category(categoria):
    try:
        page  = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 10))
        skip  = (page - 1) * limit

        products = list(
            db.games.find({"genre": categoria}).skip(skip).limit(limit)
        )
        products = [serialize(p) for p in products]
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 8. GET /api/v1/products/price  –  Por intervalo de preço, ordenado, com paginação
@app.route("/api/v1/products/price", methods=["GET"])
def get_products_by_price():
    try:
        min_price = float(request.args.get("min", 0))
        max_price = float(request.args.get("max", 9999))
        order     = request.args.get("order", "asc")
        page      = int(request.args.get("page", 1))
        limit     = int(request.args.get("limit", 10))
        skip      = (page - 1) * limit

        sort_dir = pymongo.ASCENDING if order == "asc" else pymongo.DESCENDING

        products = list(
            db.games
              .find({"price": {"$gte": min_price, "$lte": max_price}})
              .sort("price", sort_dir)
              .skip(skip)
              .limit(limit)
        )
        products = [serialize(p) for p in products]
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ══════════════════════════════════════════════
# UTILIZADORES
# ══════════════════════════════════════════════

# 9. POST /api/v1/user/signup  –  Registar novo utilizador
@app.route("/api/v1/user/signup", methods=["POST"])
def signup():
    try:
        data     = request.get_json()
        name     = data.get("name")
        email    = data.get("email")
        password = data.get("password")

        if not name or not password:
            return jsonify({"error": "Email e password são obrigatórios"}), 400

        if db.users.find_one({"email": email}):
            return jsonify({"error": "Este email já está registado"}), 409

        new_user = {
            "name": name,
            "email": email,
            "password": password,
            "confirmed": True
        }
        db.users.insert_one(new_user)
        return jsonify({"message": "Utilizador registado. Aguarda confirmação do admin."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 10. POST /api/v1/user/login  –  Autenticar utilizador com JWT
@app.route("/api/v1/user/login", methods=["POST"])
def login():
    try:
        data     = request.get_json()
        email    = data.get("email")
        password = data.get("password")

        username = data.get("name")
        user = db.users.find_one({"name": username, "password": password})
        if not user:
            return jsonify({"error": "Email ou password incorretos"}), 401

        if not user.get("confirmed"):
            return jsonify({"error": "Conta ainda não confirmada pelo admin"}), 403

        # Gerar JWT token com expiração de 24 horas
        token = jwt.encode({
            "email": user.get("email"),
            "name": user.get("name"),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Login bem-sucedido",
            "token": token,
            "user": {
                "name": user.get("name"),
                "email": user.get("email")
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 11. POST /api/v1/user/confirmation  –  Admin confirma utilizador
@app.route("/api/v1/user/confirmation", methods=["POST"])
def confirm_user():
    try:
        data  = request.get_json()
        email = data.get("email")

        result = db.users.update_one(
            {"email": email},
            {"$set": {"confirmed": True}}
        )
        if result.matched_count == 0:
            return jsonify({"error": "Utilizador não encontrado"}), 404

        return jsonify({"message": f"Utilizador '{email}' confirmado com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True)
