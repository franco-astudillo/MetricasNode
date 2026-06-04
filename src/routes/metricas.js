const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Helper: Convierte de snake_case (BD) a camelCase (Frontend)
const formatRow = (row) => ({
  id: row.id,
  nombreKpi: row.nombre_kpi,
  valorCalculado: row.valor_calculado,
  fechaCalculo: row.fecha_calculo,
  proyectoId: row.proyecto_id
});

// GET: Obtener todas las métricas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM metricas_historicas');
    if (result.rows.length === 0) return res.status(204).send();
    res.json(result.rows.map(formatRow));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Obtener métrica por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM metricas_historicas WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send();
    res.json(formatRow(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Crear métrica
router.post('/', async (req, res) => {
  try {
    const { nombreKpi, valorCalculado, fechaCalculo, proyectoId } = req.body;
    const fecha = fechaCalculo || new Date().toISOString().split('T')[0];

    const result = await pool.query(
      'INSERT INTO metricas_historicas (nombre_kpi, valor_calculado, fecha_calculo, proyecto_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombreKpi, valorCalculado, fecha, proyectoId]
    );
    res.status(201).json(formatRow(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Actualizar métrica
router.put('/:id', async (req, res) => {
  try {
    const { nombreKpi, valorCalculado, fechaCalculo, proyectoId } = req.body;
    
    // Primero verificamos si existe
    const check = await pool.query('SELECT id FROM metricas_historicas WHERE id = $1', [req.params.id]);
    if (check.rows.length === 0) return res.status(404).send();

    const result = await pool.query(
      'UPDATE metricas_historicas SET nombre_kpi = $1, valor_calculado = $2, fecha_calculo = $3, proyecto_id = $4 WHERE id = $5 RETURNING *',
      [nombreKpi, valorCalculado, fechaCalculo, proyectoId, req.params.id]
    );
    res.json(formatRow(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar métrica
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM metricas_historicas WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).send();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;