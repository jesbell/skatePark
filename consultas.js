import pool from "./dbConfig.js";

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

const getSkaters = async () => {
    try {
        const result = await pool.query('SELECT * from skaters');
        return result;
    } catch (error) {
        console.log("Erros al consultar Skaters");
    }
}

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



export { agregarUsuario, getSkaters, getUsuario };