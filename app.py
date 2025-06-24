from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


# Configuración de la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Archivo database.db en la raíz
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Definición de un modelo ejemplo: Usuario
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    usuario = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


@app.route('/')
def index():
    return render_template('index.html')


# Ruta normal para formulario de registro
@app.route('/registro')
def registro():
    return render_template('registro.html')

# Ruta normal para inicio de sesión
@app.route('/login')
def login():
    return render_template('inicio-sesion.html')

# Ruta normal para el catálogo
@app.route('/catalogo')
def catalogo():
    return render_template('Catalogo.html')

# Ruta API para registrar usuario (JSON)
# Ruta para recibir el JSON
@app.route('/api/registro', methods=['POST'])
def api_registro():
    data = request.get_json()

    if not data:
        return jsonify({'mensaje': 'No se recibió JSON'}), 400

    try:
        # Validación opcional para evitar duplicados
        if Usuario.query.filter((Usuario.email == data['email']) | (Usuario.usuario == data['usuario'])).first():
            return jsonify({'mensaje': 'Email o usuario ya registrado'}), 400
        
        nuevo_usuario = Usuario(
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            telefono=data.get('telefono', ''),
            usuario=data['usuario'],
            password=data['password']
        )

        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({'mensaje': 'Usuario registrado con éxito'}), 201

    except Exception as e:
        return jsonify({'mensaje': f'Error al registrar: {str(e)}'}), 500
    
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    print("Intento de login:", data)

    if not data or not data.get('usuario') or not data.get('password'):
        return jsonify({'mensaje': 'Faltan datos'}), 400

    usuario = Usuario.query.filter_by(usuario=data['usuario']).first()

    if usuario and usuario.password == data['password']:
        return jsonify({'mensaje': f'¡Bienvenido, {usuario.nombre}!'}), 200
    else:
        return jsonify({'mensaje': 'Usuario o contraseña incorrectos'}), 401

# Inicializa la base de datos si no existe

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)