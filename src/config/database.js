const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'test' ? false : {
    rejectUnauthorized: false 
  }
});

// Función para simular el ddl-auto=update de Hibernate
const initDB = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS metricas_historicas (
      id SERIAL PRIMARY KEY,
      nombre_kpi VARCHAR(150) NOT NULL,
      valor_calculado REAL NOT NULL,
      fecha_calculo DATE NOT NULL,
      proyecto_id INTEGER
    );
  `;
  try {
    await pool.query(queryText);
    console.log(' Base de datos conectada y tabla metricas_historicas asegurada.');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

initDB();

module.exports = pool;