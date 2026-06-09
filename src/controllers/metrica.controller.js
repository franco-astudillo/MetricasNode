const MetricaService = require('../services/metrica.service');
const MetricaModel = require('../models/metrica.model');

const service = new MetricaService();

class MetricaController {
  async findAll(req, res) {
    try {
      const metricas = await service.findAll();
      if (metricas.length === 0) return res.status(204).send();
      return res.json(MetricaModel.fromList(metricas));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async findById(req, res) {
    try {
      const metrica = await service.findById(req.params.id);
      if (!metrica) return res.status(404).json({ message: "Métrica no encontrada" });
      return res.json(new MetricaModel(metrica));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const metrica = await service.create(req.body);
      return res.status(201).json(new MetricaModel(metrica));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const metrica = await service.update(req.params.id, req.body);
      if (!metrica) return res.status(404).json({ message: "Métrica no encontrada" });
      return res.json(new MetricaModel(metrica));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const metrica = await service.delete(req.params.id);
      if (!metrica) return res.status(404).json({ message: "Métrica no encontrada" });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = MetricaController;