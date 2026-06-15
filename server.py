"""
UNAB — server.py
Flask backend para PythonAnywhere
Sirve materias desde materias.json
Sirve PDFs desde static/materiales/
Auth con JWT (login, register, forgot-password, reset-password)
Roles: estudiante / admin
"""
import json
import hashlib
import os
import datetime
import re
from typing import Optional
from flask import Flask, request, jsonify, make_response, send_from_directory  # type: ignore[import]
import jwt  # type: ignore[import]
try:
    import importlib
    secure_filename = importlib.import_module("werkzeug.utils").secure_filename
except (ImportError, ModuleNotFoundError, AttributeError):
    def secure_filename(filename: str) -> str:
        filename = filename.replace('\\', '/').split('/')[-1]
        filename = re.sub(r'[^A-Za-z0-9_.-]', '_', filename)
        filename = filename.strip('._-')
        return filename or 'file'

# ── Configuración ───────────────────────────────────────────────
app = Flask(__name__, static_folder="static")
JWT_SECRET = "unab_jwt_secret_2026"
RST_SECRET = "unab_reset_secret_2026"
DB_FILE = os.path.join(os.path.dirname(__file__), "usuarios.json")
MAT_FILE = os.path.join(os.path.dirname(__file__), "materias.json")
MAT_DIR = os.path.join(os.path.dirname(__file__), "static", "materiales")

# ── Helpers ─────────────────────────────────────────────────────
def hsh(p: str) -> str:
    return hashlib.sha256(p.encode()).hexdigest()

def db_load() -> dict:
    if os.path.exists(DB_FILE):
        with open(DB_FILE, encoding="utf-8") as f:
            return json.load(f)
    inicial = {"users": [
        {"id": 1, "name": "Admin UNAB", "email": "admin@unab.edu.ar",
         "password": hsh("Admin1234"), "role": "admin", "carrera": None},
        {"id": 2, "name": "Juan Pérez", "email": "estudiante@unab.edu.ar",
         "password": hsh("Estudiante123"), "role": "estudiante", "carrera": "Tec. Programación"},
    ]}
    db_save(inicial)
    return inicial

def db_save(db: dict) -> None:
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, indent=2, ensure_ascii=False)

def mat_load() -> list:
    if not os.path.exists(MAT_FILE):
        return []
    with open(MAT_FILE, encoding="utf-8") as f:
        return json.load(f)

def mat_save(lista: list) -> None:
    with open(MAT_FILE, "w", encoding="utf-8") as f:
        json.dump(lista, f, indent=2, ensure_ascii=False)

def mk_token(u: dict) -> str:
    return jwt.encode({
        "sub": u["id"], "name": u["name"],
        "email": u["email"], "role": u["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
    }, JWT_SECRET, algorithm="HS256")

def mk_reset(u: dict) -> str:
    return jwt.encode({
        "sub": u["id"], "email": u["email"], "type": "reset",
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }, RST_SECRET, algorithm="HS256")

def current_user() -> Optional[dict]:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    try:
        return jwt.decode(auth[7:], JWT_SECRET, algorithms=["HS256"])
    except Exception:
        return None

def pub(u: dict) -> dict:
    return {k: u[k] for k in ("id", "name", "email", "role", "carrera")}

def sanitize_folder(name: str) -> str:
    import unicodedata
    # Normaliza a NFD y elimina diacríticos (tildes, etc.)
    nfd = unicodedata.normalize("NFD", name)
    ascii_only = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    s = ascii_only.upper().strip()
    s = re.sub(r"[,.']+", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()

# ── CORS ─────────────────────────────────────────────────────────
@app.after_request
def cors(r):
    r.headers["Access-Control-Allow-Origin"] = "*"
    r.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    r.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return r

@app.before_request
def preflight():
    if request.method == "OPTIONS":
        r = make_response()
        cors(r)
        return r, 200

# ── RUTAS: MATERIAS ──────────────────────────────────────────────
@app.get("/api/materias")
def get_materias():
    lista = mat_load()
    # Normaliza carpeta en vuelo para datos históricos con tildes
    for m in lista:
        for entry in m.get("materiales", []):
            if isinstance(entry, dict) and entry.get("carpeta"):
                entry["carpeta"] = sanitize_folder(entry["carpeta"])
    return jsonify(lista)

@app.get("/api/admin/migrate-carpetas")
def migrate_carpetas():
    """Migra carpetas con tildes a su versión normalizada (sin tildes) en materias.json y en disco."""
    u = current_user()
    if not u or u["role"] != "admin":
        return jsonify({"error": "Solo administradores"}), 403
    import shutil
    materias = mat_load()
    cambios = []
    for m in materias:
        for entry in m.get("materiales", []):
            if isinstance(entry, dict) and entry.get("carpeta"):
                original = entry["carpeta"]
                normalizada = sanitize_folder(original)
                if original != normalizada:
                    entry["carpeta"] = normalizada
                    cambios.append(f"{original} → {normalizada}")
                    # Renombrar carpeta en disco si existe la vieja
                    old_dir = os.path.join(MAT_DIR, original)
                    new_dir = os.path.join(MAT_DIR, normalizada)
                    if os.path.isdir(old_dir) and not os.path.isdir(new_dir):
                        os.rename(old_dir, new_dir)
                    elif os.path.isdir(old_dir) and os.path.isdir(new_dir):
                        # Mover archivos individualmente si ambas existen
                        for f in os.listdir(old_dir):
                            src = os.path.join(old_dir, f)
                            dst = os.path.join(new_dir, f)
                            if not os.path.exists(dst):
                                shutil.move(src, dst)
    mat_save(materias)
    return jsonify({"message": f"Migración completada. {len(cambios)} cambios.", "cambios": cambios})

@app.get("/api/materias/<int:mid>")
def get_materia(mid: int):
    m = next((x for x in mat_load() if x["id"] == mid), None)
    if not m:
        return jsonify({"error": "Materia no encontrada"}), 404
    return jsonify(m)

# ── RUTAS: PDFs ──────────────────────────────────────────────────
# Ambas rutas apuntan a static/materiales/
@app.get("/static/programas/<path:filename>")
def serve_programa(filename):
    return send_from_directory(MAT_DIR, filename)

@app.get("/static/materiales/<path:filename>")
def serve_material(filename):
    import unicodedata
    # Intenta primero con el path tal cual (para archivos sin tildes)
    ruta = os.path.join(MAT_DIR, filename)
    if os.path.exists(ruta):
        parts = filename.rsplit("/", 1)
        if len(parts) == 2:
            return send_from_directory(os.path.join(MAT_DIR, parts[0]), parts[1])
        return send_from_directory(MAT_DIR, filename)
    # Si no existe, intenta normalizando (elimina tildes) la parte de carpeta
    parts = filename.rsplit("/", 1)
    if len(parts) == 2:
        carpeta_raw, archivo = parts
        nfd = unicodedata.normalize("NFD", carpeta_raw)
        carpeta_norm = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
        return send_from_directory(os.path.join(MAT_DIR, carpeta_norm), archivo)
    return send_from_directory(MAT_DIR, filename)

# ── RUTAS: AUTH ──────────────────────────────────────────────────
@app.get("/")
def health():
    return jsonify({"status": "UNAB API activa", "version": "1.0"})

@app.post("/api/auth/login")
def login():
    d = request.get_json() or {}
    email = d.get("email", "").strip().lower()
    db = db_load()
    u = next((x for x in db["users"] if x["email"].lower() == email), None)
    if not u or u["password"] != hsh(d.get("password", "")):
        return jsonify({"error": "Email o contraseña incorrectos"}), 401
    return jsonify({"token": mk_token(u), "user": pub(u)})

@app.post("/api/auth/register")
def register():
    d = request.get_json() or {}
    name = d.get("name", "").strip()
    email = d.get("email", "").strip().lower()
    pwd = d.get("password", "")
    carrera = d.get("carrera", "")
    if not name or not email or not pwd:
        return jsonify({"error": "Nombre, email y contraseña son requeridos"}), 400
    if len(pwd) < 8:
        return jsonify({"error": "La contraseña debe tener al menos 8 caracteres"}), 400
    db = db_load()
    if any(x["email"].lower() == email for x in db["users"]):
        return jsonify({"error": "Ese email ya está registrado"}), 409
    nid = max(x["id"] for x in db["users"]) + 1
    u = {"id": nid, "name": name, "email": email,
         "password": hsh(pwd), "role": "estudiante", "carrera": carrera}
    db["users"].append(u)
    db_save(db)
    return jsonify({"token": mk_token(u), "user": pub(u)}), 201

@app.post("/api/auth/forgot-password")
def forgot():
    d = request.get_json() or {}
    email = d.get("email", "").strip().lower()
    db = db_load()
    u = next((x for x in db["users"] if x["email"].lower() == email), None)
    msg = "Si el email existe, recibirás instrucciones."
    if u:
        return jsonify({"message": msg, "reset_token": mk_reset(u)})
    return jsonify({"message": msg})

@app.post("/api/auth/reset-password")
def reset_password():
    d = request.get_json() or {}
    tok = d.get("token", "")
    pwd = d.get("password", "")
    if len(pwd) < 8:
        return jsonify({"error": "Mínimo 8 caracteres"}), 400
    try:
        p = jwt.decode(tok, RST_SECRET, algorithms=["HS256"])
        assert p.get("type") == "reset"
    except Exception:
        return jsonify({"error": "Token inválido o expirado"}), 400
    db = db_load()
    u = next((x for x in db["users"] if x["id"] == p["sub"]), None)
    if not u:
        return jsonify({"error": "Usuario no encontrado"}), 404
    u["password"] = hsh(pwd)
    db_save(db)
    return jsonify({"message": "Contraseña actualizada. Ya podés iniciar sesión."})

@app.get("/api/auth/me")
def me():
    u = current_user()
    if not u:
        return jsonify({"error": "No autorizado"}), 401
    return jsonify(u)

# ── RUTAS: ADMIN ─────────────────────────────────────────────────
@app.get("/api/admin/users")
def admin_users():
    u = current_user()
    if not u:
        return jsonify({"error": "No autorizado"}), 401
    if u["role"] != "admin":
        return jsonify({"error": "Solo administradores"}), 403
    return jsonify([pub(x) for x in db_load()["users"]])

@app.put("/api/admin/users/<int:uid>/role")
def admin_role(uid: int):
    u = current_user()
    if not u:
        return jsonify({"error": "No autorizado"}), 401
    if u["role"] != "admin":
        return jsonify({"error": "Solo administradores"}), 403
    d = request.get_json() or {}
    role = d.get("role")
    if role not in ("admin", "estudiante"):
        return jsonify({"error": "Rol inválido"}), 400
    db = db_load()
    target = next((x for x in db["users"] if x["id"] == uid), None)
    if not target:
        return jsonify({"error": "Usuario no encontrado"}), 404
    target["role"] = role
    db_save(db)
    return jsonify({"message": f"Rol de {target['name']} actualizado a '{role}'"})

@app.post("/api/admin/upload")
def admin_upload():
    u = current_user()
    if not u:
        return jsonify({"error": "No autorizado"}), 401
    if u["role"] != "admin":
        return jsonify({"error": "Solo administradores"}), 403
    mid = request.form.get("materia_id")
    tipo = request.form.get("tipo", "material")
    file = request.files.get("file")
    if not mid or not file:
        return jsonify({"error": "Falta materia_id o archivo"}), 400
    filename = secure_filename(file.filename)
    if not filename.lower().endswith(".pdf"):
        return jsonify({"error": "Solo se permiten archivos PDF"}), 400
    try:
        mid_int = int(mid)
    except ValueError:
        return jsonify({"error": "materia_id inválido"}), 400
    materias = mat_load()
    materia = next((m for m in materias if m["id"] == mid_int), None)
    if not materia:
        return jsonify({"error": "Materia no encontrada"}), 404
    if tipo == "programa":
        carpeta = MAT_DIR
        carpeta_rel = "materiales"
    else:
        carpeta_nombre = sanitize_folder(materia["nombre"])
        carpeta = os.path.join(MAT_DIR, carpeta_nombre)
        carpeta_rel = f"materiales/{carpeta_nombre}"
        os.makedirs(carpeta, exist_ok=True)
    ruta_abs = os.path.join(carpeta, filename)
    file.save(ruta_abs)
    if tipo == "material":
        # carpeta_nombre ya está normalizado (sin tildes) por sanitize_folder,
        # coincide exactamente con el nombre de carpeta en disco
        entry = {"carpeta": carpeta_nombre, "archivo": filename}
        ya_existe = any(
            (isinstance(x, dict) and x.get("archivo") == filename and x.get("carpeta") == carpeta_nombre) or
            (isinstance(x, str) and x == filename)
            for x in materia.get("materiales", [])
        )
        if not ya_existe:
            if "materiales" not in materia:
                materia["materiales"] = []
            materia["materiales"].append(entry)
            mat_save(materias)
    return jsonify({
        "message": "Archivo subido correctamente",
        "archivo": filename,
        "carpeta": carpeta_rel,
        "ruta": f"static/{carpeta_rel}/{filename}"
    })

@app.delete("/api/admin/materiales/<int:mid>")
def admin_delete_material(mid: int):
    u = current_user()
    if not u:
        return jsonify({"error": "No autorizado"}), 401
    if u["role"] != "admin":
        return jsonify({"error": "Solo administradores"}), 403
    d = request.get_json() or {}
    carpeta = d.get("carpeta", "")
    archivo = d.get("archivo", "")
    if not archivo:
        return jsonify({"error": "Falta nombre de archivo"}), 400
    materias = mat_load()
    materia = next((m for m in materias if m["id"] == mid), None)
    if not materia:
        return jsonify({"error": "Materia no encontrada"}), 404
    if carpeta:
        ruta_abs = os.path.join(MAT_DIR, carpeta, archivo)
    else:
        ruta_abs = os.path.join(MAT_DIR, archivo)
    if os.path.exists(ruta_abs):
        os.remove(ruta_abs)
    if "materiales" in materia:
        materia["materiales"] = [
            x for x in materia["materiales"]
            if not (
                (isinstance(x, dict) and x.get("archivo") == archivo) or
                (isinstance(x, str) and x == archivo)
            )
        ]
        mat_save(materias)
    return jsonify({"message": f"Archivo '{archivo}' eliminado"})

# ── INICIO ───────────────────────────────────────────────────────
db_load()
for d in ["static/materiales"]:
    os.makedirs(os.path.join(os.path.dirname(__file__), d), exist_ok=True)

# Esta variable es la que usa PythonAnywhere (y cualquier WSGI server)
application = app

if __name__ == "__main__":
    print("\n" + "= " * 54)
    print("  UNAB Backend — http://localhost:5000")
    print("  Materias:   GET /api/materias")
    print("  PDFs:       GET /static/materiales/<archivo.pdf>")
    print("  Admin:      admin@unab.edu.ar  /  Admin1234")
    print("= " * 54 + "\n")
    app.run(host="0.0.0.0", port=5000, debug=False)

@app.get("/portal")
def portal():
    return send_from_directory("/home/PortalUNAB/Portal", "index.html")

@app.get("/app")
def frontend():
    from flask import send_file
    return send_file("/home/PortalUNAB/Portal/index.html")

