from flask import Flask, render_template, json, send_from_directory
import os

app = Flask(__name__)

# 1. Creamos el "Molde" (Objeto Materia)
class Materia:
    def __init__(self, datos_materia):
        self.id = datos_materia.get("id")
        self.nombre = datos_materia.get("nombre")
        self.anio = datos_materia.get("anio")
        self.cuatrimestre = datos_materia.get("cuatrimestre")
        self.horas = datos_materia.get("horas")
        self.descripcion = datos_materia.get("descripcion")
        self.correlativas = datos_materia.get("correlativas", [])
        self.aprobada = datos_materia.get("aprobada", [])
        self.archivo_pdf = datos_materia.get("archivo_pdf")
        self.materiales = datos_materia.get("materiales", [])

# 2. Creamos el Gestor (El encargado de la lógica)
class GestorCarrera:
    def __init__(self, archivo_json):
        self.archivo_json = archivo_json

    def obtener_todas_las_materias(self):
        # Lee el JSON y convierte cada diccionario en un Objeto "Materia"
        with open(self.archivo_json, 'r', encoding='utf-8') as f:
            lista_diccionarios = json.load(f)
        
        # Esto es POO: transformamos datos sueltos en una lista de objetos reales
        return [Materia(m) for m in lista_diccionarios]


# --- RUTAS DE FLASK (El puente con la web) ---

# Instanciamos nuestro objeto gestor
gestor = GestorCarrera('materias.json')

@app.route('/')
def home():
    # Pedimos los objetos al gestor
    lista_objetos_materias = gestor.obtener_todas_las_materias()
    return render_template('index.html', materias=lista_objetos_materias)

@app.route('/programas/<filename>')
def ver_pdf(filename):
    ruta_programas = os.path.join(app.root_path, 'static', 'programas')
    return send_from_directory(ruta_programas, filename)

if __name__ == '__main__':
    app.run(debug=True)
