import pg from 'pg';
const { Pool } = pg;

// Agrega tus datos de conexión
const name = "";
const pass = "";

const pool = new Pool({
    user: name,
    host: "localhost",
    password: pass,
    database: "skatepark",
    port: 5432,
});

const conectarDB = async () => {
    try {
        const res = await pool.query(`SELECT NOW()`);
        console.log("Conexion exitosa, fecha y hora actuales:", res.rows[0]);
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error);
    }
}

// Llamar a la función de conectarDB
conectarDB();

export default pool;