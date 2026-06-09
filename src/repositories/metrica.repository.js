const pool = require('../config/database');

class MetricaRepository {
  async findAll() {
    const result = await pool.query('SELECT * FROM metricas_historicas');
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM metricas_historicas WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(data) {
    const { nombreKpi, valorCalculado, fechaCalculo, proyectoId } = data;
    const fecha = fechaCalculo || new Date().toISOString().split('T')[0];
    const result = await pool.query(
      'INSERT INTO metricas_historicas (nombre_kpi, valor_calculado, fecha_calculo, proyecto_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombreKpi, valorCalculado, fecha, proyectoId]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { nombreKpi, valorCalculado, fechaCalculo, proyectoId } = data;
    const result = await pool.query(
      'UPDATE metricas_historicas SET nombre_kpi = $1, valor_calculado = $2, fecha_calculo = $3, proyecto_id = $4 WHERE id = $5 RETURNING *',
      [nombreKpi, valorCalculado, fechaCalculo, proyectoId, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM metricas_historicas WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = MetricaRepository;