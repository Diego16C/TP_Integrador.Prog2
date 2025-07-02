from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Configuración de la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    usuario = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, default=False)  

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    precio = db.Column(db.Float, nullable=False)
    imagen = db.Column(db.String(100), nullable=True)


def es_admin(usuario):
    u = Usuario.query.filter_by(usuario=usuario).first()
    return u and u.admin

# RUTAS DE PÁGINAS
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/login')
def login():
    return render_template('inicio-sesion.html')

@app.route('/catalogo')
def catalogo():
    productos = Producto.query.all()
    return render_template('Catalogo.html', productos=productos)

@app.route('/producto')
def producto_admin():
    return render_template('producto.html')

# API: REGISTRO
@app.route('/api/registro', methods=['POST'])
def api_registro():
    data = request.get_json()

    if not data:
        return jsonify({'mensaje': 'No se recibió JSON'}), 400

    try:
        if Usuario.query.filter(or_(Usuario.email == data['email'], Usuario.usuario == data['usuario'])).first():
            return jsonify({'mensaje': 'Email o usuario ya registrado'}), 400

        hashed_pw = generate_password_hash(data['password'])

        nuevo_usuario = Usuario(
            nombre=data['nombre'],
            apellido=data['apellido'],
            email=data['email'],
            telefono=data.get('telefono', ''),
            usuario=data['usuario'],
            password=hashed_pw,
            admin=False
        )

        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({'mensaje': 'Usuario registrado con éxito'}), 201

    except Exception as e:
        return jsonify({'mensaje': f'Error al registrar: {str(e)}'}), 500

# API: LOGIN
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()

    if not data or not data.get('usuario') or not data.get('password'):
        return jsonify({'mensaje': 'Faltan datos'}), 400

    usuario = Usuario.query.filter_by(usuario=data['usuario']).first()

    if usuario and check_password_hash(usuario.password, data['password']):
        return jsonify({'mensaje': f'¡Bienvenido, {usuario.nombre}!', 'admin': usuario.admin}), 200
    else:
        return jsonify({'mensaje': 'Usuario o contraseña incorrectos'}), 401


@app.route('/api/productos', methods=['GET'])
def listar_productos():
    productos = Producto.query.all()
    return jsonify([{
        'id': p.id,
        'nombre': p.nombre,
        'descripcion': p.descripcion,
        'precio': p.precio,
        'imagen': p.imagen
    } for p in productos])

@app.route('/api/productos', methods=['POST'])
def agregar_producto():
    data = request.get_json()
    usuario = data.get('usuario')
    if not es_admin(usuario):
        return jsonify({'mensaje': 'Acceso denegado'}), 403

    nuevo_producto = Producto(
        nombre=data['nombre'],
        descripcion=data.get('descripcion', ''),
        precio=data['precio'],
        imagen=data.get('imagen', '')
    )
    db.session.add(nuevo_producto)
    db.session.commit()
    return jsonify({'mensaje': 'Producto agregado'}), 201


@app.route('/api/productos/<int:id>', methods=['PUT'])
def modificar_producto(id):
    data = request.get_json()
    usuario = data.get('usuario')
    if not es_admin(usuario):
        return jsonify({'mensaje': 'Acceso denegado'}), 403

    producto = Producto.query.get_or_404(id)
    producto.nombre = data.get('nombre', producto.nombre)
    producto.descripcion = data.get('descripcion', producto.descripcion)
    producto.precio = data.get('precio', producto.precio)
    producto.imagen = data.get('imagen', producto.imagen)

    db.session.commit()
    return jsonify({'mensaje': 'Producto actualizado'})


@app.route('/api/productos/<int:id>', methods=['DELETE'])
def borrar_producto(id):
    usuario = request.args.get('usuario')
    if not es_admin(usuario):
        return jsonify({'mensaje': 'Acceso denegado'}), 403

    producto = Producto.query.get_or_404(id)
    db.session.delete(producto)
    db.session.commit()
    return jsonify({'mensaje': 'Producto eliminado'})

# INICIAR APP
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)