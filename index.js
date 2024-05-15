import { fileURLToPath } from 'url'; // función para convertir URL de archivo a ruta de sistema de archivos
import { dirname } from 'path'; // funciones para manejo de rutas de archivos y directorios
import express from "express";
import path from 'path';
import expressFileUpload from 'express-fileupload';
import exphbs from 'express-handlebars';
import jwt from 'jsonwebtoken';
import pool from './dbConfig.js';
import { agregarUsuario, getSkaters, getUsuario, getUsuarioId, eliminarUsuario, editarUsuario, actualizarEstado } from './consultas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.engine('.handlebars', exphbs.engine(
    {
        layoutsDir: __dirname + "/views",
        defaultLayout: false, 
        helpers: { 
            add: function(index) { 
                return index + 1; 
            }
        },
    }
));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
    })
);

// carga la página index
app.get('/', async (req, res) => {
    try {
        const skaters = await getSkaters();
        res.render('index', { skaters: skaters.rows });
    } catch (error) {
        console.error("Error al cargar a los skaters");
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/registrarme', (req, res) => {
    res.render('registrarme');
});

app.get('/iniciar', (req, res) => {
    res.render('login');
});

// endpoint para efectuar el registro de un usuario
app.post('/registro', async (req,res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    const foto_perfil = req.files ? req.files.foto_perfil : null;

    if (!foto_perfil) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    const nombreArchivo = `${nombre}_${anos_experiencia}.jpg`;
    const ruta = path.join('assets', 'img', nombreArchivo);
    const rutaImagen = path.join(__dirname, 'public', 'assets', 'img', nombreArchivo);

    foto_perfil.mv(rutaImagen, (error) => {
        if (error) {
            console.error('Error al guardar la imagen:', error);
            return res.status(500).json({ error: 'Error al guardar la imagen' });
        }
    });

    try {
        await agregarUsuario(email, nombre, password, anos_experiencia, especialidad, ruta);
        res.json({ message: 'Registro exitoso. Puede Iniciar Sesión' });
    } catch (error) {
        res.status(500).json({ message: 'Error en registro', message: error.message });
        console.log(error);
    }
    
});

// end point para autenticar usuario:
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const encontrado = await getUsuario(email, password);

        if (!encontrado) {
            return res.status(401).send("Usuario no encontrado");
        }

        const token = jwt.sign({ userId: encontrado.id }, "Mi llave secreta", {
            expiresIn: "1h",
        });
        res.json({ message: 'Ha iniciado sesión exitosamente', token });
    
    } catch (error) {
        res.status(500).json({ message: 'Se ha producido un error' });
        console.log(error);
    }
});

app.get('/datos', (req, res) => {
    res.render('datos');
});

// Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Token no proporcionado");
    }

    jwt.verify(token, "Mi llave secreta", (err, decoded) => {
        if (err) {
        return res.status(401).send("Token inválido");
        }
        req.userId = decoded.userId;
        next();
    });
};

// Obtener los datos del usuario para la página datos.handlebars
app.get('/usuario', verifyToken, async (req, res) => {
    try {
        const id = req.userId;

        // Consultar y obtener datos del usuario
        const usuario = await getUsuarioId(id);

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Eliminar usuario por id:
app.delete('/usuario/:id', verifyToken, async (req, res) => {
    const userId = req.params.id;
    const idToken = req.userId;
    console.log("userId:",userId)
    console.log("idtoken:", idToken)

    if (userId !== idToken.toString()) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este usuario' });
    }
    try {
        await eliminarUsuario(userId);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }

});

// Editar usuario
app.put('/usuario/:id', verifyToken, async (req, res) => {
    const userId = req.params.id;
    const idToken = req.userId;

    if (userId !== idToken.toString()) {
        return res.status(403).json({ message: 'No tienes permiso para editar este usuario' });
    }

    const userData = req.body;

    try {
        const resultado = await editarUsuario(idToken, userData.nombre, userData.password, userData.anos_experiencia, userData.especialidad);
        //console.log(resultado);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
        console.log(error);
    }
});

// carga la página admin
app.get('/admin', async (req, res) => {
    try {
        const skaters = await getSkaters();
        res.render('admin', { skaters: skaters.rows });
    } catch (error) {
        console.error("Error al cargar a los skaters");
        res.status(500).send('Error interno del servidor');
    }
});

// Actualiza estado del skater
app.put('/skaters/:id', async (req, res) => {
    const skaterId = req.params.id;
    const estado = req.body.estado;
    console.log(skaterId);
    console.log(estado);
    try {
        const resultado = await actualizarEstado(skaterId, estado);
        console.log(resultado);
        res.status(200).json({ message: 'Estado del usuario cambiado correctamente' });
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});