import pool from "./dbConfig.js";

// Función que agrega usuario a la base de datos
const agregarUsuario = async(email, nombre, password, anos_experiencia, especialidad, foto) => {
    try {
        const query ='INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [email, nombre, password, anos_experiencia, especialidad, foto, false];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error al agregar usuario a la base de datos", error);
    }
}

// Carga datos de los skaters
const getSkaters = async () => {
    try {
        const result = await pool.query('SELECT * from skaters');
        return result;
    } catch (error) {
        console.log("Error al consultar Skaters");
    }
}

// Función que consulta por el usuario 
const getUsuario = async (email, password) => {
    try {
        const query = {
            text: 'SELECT * FROM skaters WHERE email = $1 AND password = $2',
            values: [email, password]
          };
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
    }
}

// Busca usuario por id
const getUsuarioId = async (id) => {
    try {
        const query = {
            text: 'SELECT * FROM skaters WHERE id = $1',
            values: [id]
        };
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
        
    } catch (error) {
        console.error('Error al buscar usuario:', error);
    }  
}

// Funcion para eliminar usuario por id
const eliminarUsuario = async (id) => {
    try {
        // Primero buscamos para salvar la ruta
        const busqueda = {
            text: 'SELECT foto FROM skaters WHERE id = $1',
            values: [id]
        };
        const resultFoto = await pool.query(busqueda);
        // Guardamos ruta imagen
        const rutaImagen = resultFoto.rows[0].foto;

        // eliminamos usuario
        const query = {
            text: 'DELETE FROM skaters WHERE id = $1',
            values: [id]
        };
        await pool.query(query);
        return rutaImagen;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    } 
}

// Editar usuario
const editarUsuario = async (id, nombre, password, anos_experiencia, especialidad) => {
    try {
        const query = {
            text: 'UPDATE skaters SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE id = $1',
            values: [id, nombre, password, anos_experiencia, especialidad]
        }; 
        const result = await pool.query(query);
        return result;        
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

// Función que actualiza el estado (true or false) del usuario
const actualizarEstado = async (id, estado) => {
    try {
        const query = {
            text: 'UPDATE skaters SET estado = $2 WHERE id = $1',
            values: [id, estado]
        }; 
        const result = await pool.query(query);
        return result;        
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}



export { agregarUsuario, getSkaters, getUsuario, getUsuarioId, eliminarUsuario, editarUsuario, actualizarEstado };