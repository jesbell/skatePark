import { fileURLToPath } from 'url'; // función para convertir URL de archivo a ruta de sistema de archivos
import { dirname } from 'path'; // funciones para manejo de rutas de archivos y directorios
import express from "express";
import path from 'path';
import expressFileUpload from 'express-fileupload';
import pool from './dbConfig.js';
import { agregarUsuario, getSkaters } from './consultas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
    })
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
    //console.log(__dirname);
});

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

// endpoint para obtener skaters
app.get('/skaters', async (req, res) => {
    try {
        const resultado = await getSkaters();
        //console.log(resultado.rows);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al cargar a los skaters");
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});